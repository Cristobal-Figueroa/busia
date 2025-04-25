import React from 'react';
import './driversTable.css';

function DriversTable() {
  return (
    <div className="drivers-table-container">
      <h1>Tabla de Conductores</h1>
      <div className="drivers-table-content">
        <table className="drivers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Licencia</th>
              <th>Experiencia</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Juan Pérez</td>
              <td>A-12345</td>
              <td>5 años</td>
              <td>Activo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>María González</td>
              <td>B-67890</td>
              <td>8 años</td>
              <td>Descanso</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Carlos Rodríguez</td>
              <td>A-54321</td>
              <td>3 años</td>
              <td>Activo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DriversTable;