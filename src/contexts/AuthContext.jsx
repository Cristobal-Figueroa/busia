import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../firebase/config';
import userService from '../services/userService';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}

// Proveedor del contexto de autenticación
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para cerrar sesión
  const signOut = () => {
    return firebaseSignOut(auth);
  };

  // Cargar datos del usuario desde Realtime Database
  const loadUserData = async (user) => {
    if (user) {
      try {
        const dbUserData = await userService.getUserById(user.uid);
        if (dbUserData) {
          setUserData(dbUserData);
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    } else {
      setUserData(null);
    }
  };

  // Efecto para escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      await loadUserData(user);
      setLoading(false);
    });

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe;
  }, []);

  // Valores que estarán disponibles en el contexto
  const value = {
    currentUser,
    userData,
    signOut,
    refreshUserData: () => loadUserData(currentUser)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
