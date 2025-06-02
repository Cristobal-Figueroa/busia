import React from 'react';
import './desktop.css';

function Desktop() {
  return (
    <div className="desktop-container">
      <h1>Escritorio</h1>
      <div src="/fleetVehicles" className="desktop-content">
        <div className="desktop-card">
          <h2>Flota</h2>
          <p>Administración de vehículos y conductores</p>
        </div>
      </div>
    </div>
  );
}

export default Desktop;