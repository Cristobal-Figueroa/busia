import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Por ahora, simplemente redirigimos al home después de "login"
    // En el futuro aquí iría la lógica de autenticación
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-logo">
          <h1>BusIA</h1>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          
          <div className="login-form-group">
            <label htmlFor="fullName">Nombre Completo</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          
          <div className="login-form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="login-form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;