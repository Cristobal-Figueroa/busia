import { ref, set, get, update, remove, child } from 'firebase/database';
import { database } from '../firebase/config';

// Servicio para manejar operaciones con usuarios en Realtime Database
const userService = {
  // Guardar un nuevo usuario en la base de datos
  saveUser: async (userId, userData) => {
    try {
      await set(ref(database, `users/${userId}`), {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw error;
    }
  },

  // Actualizar datos de un usuario existente
  updateUser: async (userId, userData) => {
    try {
      const updates = {
        ...userData,
        updatedAt: new Date().toISOString()
      };
      await update(ref(database, `users/${userId}`), updates);
      return true;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  },

  // Obtener datos de un usuario por su ID
  getUserById: async (userId) => {
    try {
      const snapshot = await get(child(ref(database), `users/${userId}`));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  },

  // Eliminar un usuario por su ID
  deleteUser: async (userId) => {
    try {
      await remove(ref(database, `users/${userId}`));
      return true;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }
};

export default userService;
