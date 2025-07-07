import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './mapa.css';

// Solución al problema de los iconos de Leaflet en React
// Esto es necesario porque Leaflet espera que las imágenes estén en una ubicación específica
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: null,
  iconUrl: null,
  shadowUrl: null,
});

// Componente principal del mapa
function Mapa() {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Función para crear un icono personalizado para el bus
  const createBusIcon = () => {
    return L.divIcon({
      html: '🚌',
      className: 'bus-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  // Función para obtener los datos del bus
  const fetchBusData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Usamos un proxy local para evitar problemas de CORS
      // En desarrollo usamos un proxy de desarrollo, en producción usaríamos el archivo PHP
      const isProduction = window.location.hostname !== 'localhost';
      
      let response;
      if (isProduction) {
        // En producción, usar el proxy PHP
        response = await fetch('/CORS.php');
      } else {
        // En desarrollo, usar un proxy local o una solución alternativa
        // Opción 1: Usar un proxy local si está disponible
        try {
          response = await fetch('/api/proxy?url=https://govia.cl/busIA/gps_data.txt');
        } catch (proxyErr) {
          console.error('Error con el proxy de desarrollo:', proxyErr);
          // Datos de ejemplo para desarrollo
          const exampleData = `2025-04-29 21:51:40 - Latitud: -36.606415, Longitud: -72.096725
2025-04-29 21:52:40 - Latitud: -36.606171, Longitud: -72.096756
2025-04-29 21:53:39 - Patente: SPXW10, Latitud: -36.606319, Longitud: -72.096725`;
          
          return processGpsData(exampleData);
        }
        
        // Si la respuesta no es OK, usar datos de ejemplo
        if (!response.ok) {
          console.warn('Proxy de desarrollo no disponible, usando datos de ejemplo');
          // Datos de ejemplo para desarrollo
          const exampleData = `2025-04-29 21:51:40 - Latitud: -36.606415, Longitud: -72.096725
2025-04-29 21:52:40 - Latitud: -36.606171, Longitud: -72.096756
2025-04-29 21:53:39 - Patente: SPXW10, Latitud: -36.606319, Longitud: -72.096725`;
          
          return processGpsData(exampleData);
        }
      }
      
      if (!response.ok) {
        throw new Error('No se pudieron obtener los datos del GPS');
      }
      
      const text = await response.text();
      return processGpsData(text);
    } catch (err) {
      console.error('Error al obtener datos del bus:', err);
      setError('Error al cargar los datos del GPS. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  // Función para procesar los datos GPS
  const processGpsData = (text) => {
    try {
      const lines = text.trim().split('\n');
      
      // Procesar los datos
      const processedData = lines.map(line => {
          const parts = line.split(' - ');
          const dateTime = parts[0];
          
          let patente = null;
          let latLngPart = parts[1];
          
          if (parts[1].startsWith('Patente:')) {
            const patenteParts = parts[1].split(', ');
            patente = patenteParts[0].replace('Patente: ', '');
            latLngPart = patenteParts.slice(1).join(', ');
          }
          
          const latMatch = latLngPart.match(/Latitud: ([-\d.]+)/);
          const lngMatch = latLngPart.match(/Longitud: ([-\d.]+)/);
          
          if (latMatch && lngMatch) {
            return {
              dateTime,
              patente,
              position: [parseFloat(latMatch[1]), parseFloat(lngMatch[1])]
            };
          }
          
          return null;
        }).filter(item => item !== null);
        
        // Ordenar por fecha/hora más reciente
        processedData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        
        setBusData(processedData);
        setLastUpdate(new Date().toLocaleString());
        return processedData;
      } catch (err) {
        console.error('Error al procesar datos del GPS:', err);
        setError('Error al procesar los datos del GPS.');
        return [];
      }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchBusData();
    
    // Actualizar datos cada 30 segundos
    const interval = setInterval(fetchBusData, 30000);
    
    // Limpiar intervalo al desmontar
    return () => clearInterval(interval);
  }, []);

  // Si no hay datos, mostrar un mensaje de carga
  if (loading && busData.length === 0) {
    return (
      <div className="mapa-container">
        <h1 className="mapa-title">Mapa de Buses</h1>
        <div className="loading">Cargando datos del GPS...</div>
      </div>
    );
  }

  // Si hay un error, mostrar mensaje de error
  if (error) {
    return (
      <div className="mapa-container">
        <h1 className="mapa-title">Mapa de Buses</h1>
        <div className="error">{error}</div>
        <button className="refresh-button" onClick={fetchBusData}>
          Reintentar
        </button>
      </div>
    );
  }

  // Obtener la posición más reciente para centrar el mapa
  const mostRecentPosition = busData.length > 0 ? busData[0].position : [-36.606, -72.096];
  
  // Agrupar buses por patente para mostrar solo el último registro de cada uno
  const latestBusesByPatente = busData.reduce((acc, bus) => {
    // Si el bus tiene patente y no está en el acumulador, o es más reciente que el existente
    if (bus.patente && (!acc[bus.patente] || new Date(bus.dateTime) > new Date(acc[bus.patente].dateTime))) {
      acc[bus.patente] = bus;
    }
    return acc;
  }, {});
  
  // Convertir el objeto a un array para renderizar
  const latestBuses = Object.values(latestBusesByPatente);
  
  // Si no hay buses con patente, usar los 5 registros más recientes
  const busesToShow = latestBuses.length > 0 ? latestBuses : busData.slice(0, 5);

  return (
    <div className="mapa-container">
      <h1 className="mapa-title">Mapa de Buses</h1>
      
      <MapContainer 
        center={mostRecentPosition} 
        zoom={15} 
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {busesToShow.map((bus, index) => (
          <Marker 
            key={`${bus.patente || 'bus'}-${index}`}
            position={bus.position}
            icon={createBusIcon()}
          >
            <Popup>
              <div className="bus-popup">
                <div className="bus-popup-content">
                  <strong>{bus.patente || 'Bus'}</strong>
                  <p>Fecha: {bus.dateTime}</p>
                  <p>Latitud: {bus.position[0]}</p>
                  <p>Longitud: {bus.position[1]}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="bus-info">
        <h2>Información de Buses</h2>
        {busesToShow.map((bus, index) => (
          <div key={`info-${bus.patente || 'bus'}-${index}`} className="bus-info-item">
            <span className="bus-info-label">{bus.patente || `Bus ${index + 1}`}:</span>
            <span>{bus.dateTime}</span>
          </div>
        ))}
      </div>
      
      <button className="refresh-button" onClick={fetchBusData}>
        Actualizar datos
      </button>
      
      {lastUpdate && (
        <div className="last-update">
          Última actualización: {lastUpdate}
        </div>
      )}
    </div>
  );
}

export default Mapa;
