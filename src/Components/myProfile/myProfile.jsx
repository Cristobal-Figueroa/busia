import React from 'react';
import './myProfile.css';

function MyProfile() {
  return (
    <div className="profile-container">
      <h1>Mi Cuenta</h1>
      <div className="profile-content">
        <div className="profile-card">
          <h2>Mi Perfil</h2>
          <p>Administra tu información personal</p>
        </div>
        <div className="profile-card">
          <h2>Datos del Administrador</h2>
          <p>Configuración del sistema</p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;