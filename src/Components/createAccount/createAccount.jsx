import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './createAccount.css';

function createAccount() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <div className="login-logo">
          <img src="/busia-logo.png" alt="BusIA Logo" className="login-logo-image" />
        </div>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>

          <div className="login-link">
            <span>¿Ya tienes una cuenta? </span>
            <Link to="/login" className="register-link">Inicia sesión aquí</Link>
          </div>

          <div className="register-form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              placeholder='Ingrese su nombre completo'
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
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
          
          <div className="register-form-group">
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

          <div className="register-options">
            <div className="register-me">
              <input
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <label htmlFor="terms">Recordarme</label>
            </div>
            <div className="terms-and-conditions">
              <Link to="/terms-and-conditions">Acepto los términos y condiciones</Link>
            </div>
          </div>

          <button type="submit" className="login-button">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default createAccount;