import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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

          <div className="login-register-link">
            <span>¿No tienes una cuenta? </span>
            <Link to="/createAccount" className="register-link">Regístrate aquí</Link>
          </div>

          <div className="login-form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              placeholder='Ingrese su correo electrónico'
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
              placeholder='Ingrese su contraseña'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Recordarme</label>
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
          </div>

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;