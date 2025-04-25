import React from 'react';
import './fleetTable.css';

function FleetTable() {
  return (
    <div className="fleet-table-container">
      <h1>Tabla de Flota</h1>
      <div className="fleet-table-content">
        <table className="fleet-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Capacidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mercedes Benz 2023</td>
              <td>ABC-123</td>
              <td>45</td>
              <td>Activo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Volvo 2022</td>
              <td>XYZ-789</td>
              <td>52</td>
              <td>Mantenimiento</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Scania 2021</td>
              <td>DEF-456</td>
              <td>48</td>
              <td>Activo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FleetTable;