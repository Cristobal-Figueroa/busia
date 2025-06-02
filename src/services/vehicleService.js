import { ref, set, get, update, remove, child, push } from 'firebase/database';
import { database } from '../firebase/config';

// Servicio para manejar operaciones con vehículos en Realtime Database
const vehicleService = {
  // Guardar un nuevo vehículo en la base de datos
  saveVehicle: async (vehicleData) => {
    try {
      const newVehicleRef = push(ref(database, 'vehicles'));
      await set(newVehicleRef, {
        ...vehicleData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { id: newVehicleRef.key, ...vehicleData };
    } catch (error) {
      console.error('Error al guardar vehículo:', error);
      throw error;
    }
  },

  // Actualizar datos de un vehículo existente
  updateVehicle: async (vehicleId, vehicleData) => {
    try {
      const updates = {
        ...vehicleData,
        updatedAt: new Date().toISOString()
      };
      await update(ref(database, `vehicles/${vehicleId}`), updates);
      return { id: vehicleId, ...updates };
    } catch (error) {
      console.error('Error al actualizar vehículo:', error);
      throw error;
    }
  },

  // Obtener todos los vehículos
  getAllVehicles: async () => {
    try {
      const snapshot = await get(child(ref(database), 'vehicles'));
      if (snapshot.exists()) {
        const vehicles = [];
        snapshot.forEach((childSnapshot) => {
          vehicles.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        return vehicles;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      throw error;
    }
  },

  // Obtener datos de un vehículo por su ID
  getVehicleById: async (vehicleId) => {
    try {
      const snapshot = await get(child(ref(database), `vehicles/${vehicleId}`));
      if (snapshot.exists()) {
        return {
          id: vehicleId,
          ...snapshot.val()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener vehículo:', error);
      throw error;
    }
  },

  // Eliminar un vehículo por su ID
  deleteVehicle: async (vehicleId) => {
    try {
      await remove(ref(database, `vehicles/${vehicleId}`));
      return true;
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
      throw error;
    }
  }
};

export default vehicleService;
