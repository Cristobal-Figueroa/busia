import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componente para proteger rutas que requieren autenticación
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  // Si no hay usuario autenticado, redirigir al login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Si hay usuario autenticado, mostrar el contenido protegido
  return children;
}

export default ProtectedRoute;
