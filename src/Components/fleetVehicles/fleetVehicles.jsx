import { useState, useEffect } from 'react';
import vehicleService from '../../services/vehicleService';
import './fleetVehicles.css';

function FleetVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para el formulario de edición/creación
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    patente: '',
    tipo: '',
    modelo: '',
    conductor: ''
  });

  // Cargar vehículos al montar el componente
  useEffect(() => {
    loadVehicles();
  }, []);

  // Función para cargar todos los vehículos
  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getAllVehicles();
      setVehicles(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar vehículos:', err);
      setError('Error al cargar los vehículos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Abrir formulario para editar
  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      patente: vehicle.patente || '',
      tipo: vehicle.tipo || '',
      modelo: vehicle.modelo || '',
      conductor: vehicle.conductor || ''
    });
    setIsFormOpen(true);
  };

  // Abrir formulario para crear
  const handleCreate = () => {
    setEditingVehicle(null);
    setFormData({
      patente: '',
      tipo: '',
      modelo: '',
      conductor: ''
    });
    setIsFormOpen(true);
  };

  // Cerrar formulario
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingVehicle(null);
  };

  // Guardar vehículo (crear o actualizar)
  const handleSaveVehicle = async (e) => {
    e.preventDefault();
    
    try {
      if (editingVehicle) {
        // Actualizar vehículo existente
        await vehicleService.updateVehicle(editingVehicle.id, formData);
      } else {
        // Crear nuevo vehículo
        await vehicleService.saveVehicle(formData);
      }
      
      // Recargar la lista y cerrar el formulario
      await loadVehicles();
      handleCloseForm();
    } catch (err) {
      console.error('Error al guardar vehículo:', err);
      setError('Error al guardar el vehículo. Por favor, intente nuevamente.');
    }
  };

  // Eliminar vehículo
  const handleDelete = async (vehicleId) => {
    if (window.confirm('¿Está seguro que desea eliminar este vehículo?')) {
      try {
        await vehicleService.deleteVehicle(vehicleId);
        await loadVehicles();
      } catch (err) {
        console.error('Error al eliminar vehículo:', err);
        setError('Error al eliminar el vehículo. Por favor, intente nuevamente.');
      }
    }
  };

  return (
    <div className="fleet-vehicles-container">
      <div className="fleet-vehicles-header">
        <h1 className="fleet-vehicles-title">Flota de Vehículos</h1>
        <button 
          className="fleet-vehicles-add-btn" 
          onClick={handleCreate}
        >
          Agregar Vehículo
        </button>
      </div>
      
      {error && <div className="fleet-vehicles-error">{error}</div>}
      
      {loading ? (
        <div className="fleet-vehicles-loading">Cargando vehículos...</div>
      ) : (
        <div className="fleet-vehicles-table-container">
          <table className="fleet-vehicles-table">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Tipo</th>
                <th>Modelo</th>
                <th>Conductor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length > 0 ? (
                vehicles.map(vehicle => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.patente}</td>
                    <td>{vehicle.tipo}</td>
                    <td>{vehicle.modelo}</td>
                    <td>{vehicle.conductor}</td>
                    <td className="fleet-vehicles-actions">
                      <button 
                        className="fleet-vehicles-edit-btn" 
                        onClick={() => handleEdit(vehicle)}
                        aria-label="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="fleet-vehicles-delete-btn" 
                        onClick={() => handleDelete(vehicle.id)}
                        aria-label="Eliminar"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="fleet-vehicles-no-data">
                    No hay vehículos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal de formulario */}
      {isFormOpen && (
        <div className="fleet-vehicles-modal">
          <div className="fleet-vehicles-modal-content">
            <span 
              className="fleet-vehicles-modal-close" 
              onClick={handleCloseForm}
            >
              &times;
            </span>
            <h2>{editingVehicle ? 'Editar Vehículo' : 'Agregar Vehículo'}</h2>
            
            <form onSubmit={handleSaveVehicle} className="fleet-vehicles-form">
              <div className="fleet-vehicles-form-group">
                <label htmlFor="patente">Patente:</label>
                <input
                  type="text"
                  id="patente"
                  name="patente"
                  value={formData.patente}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="fleet-vehicles-form-group">
                <label htmlFor="tipo">Tipo:</label>
                <input
                  type="text"
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="fleet-vehicles-form-group">
                <label htmlFor="modelo">Modelo:</label>
                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="fleet-vehicles-form-group">
                <label htmlFor="conductor">Conductor:</label>
                <input
                  type="text"
                  id="conductor"
                  name="conductor"
                  value={formData.conductor}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="fleet-vehicles-form-actions">
                <button type="button" onClick={handleCloseForm} className="fleet-vehicles-cancel-btn">
                  Cancelar
                </button>
                <button type="submit" className="fleet-vehicles-save-btn">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FleetVehicles;