import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './createAccount.css';

function CreateAccount() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }
    
    if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'Debe aceptar los términos y condiciones';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí iría la lógica para crear la cuenta
      console.log('Cuenta creada con éxito', { name, email, password, rememberMe, acceptTerms });
      navigate('/');
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-form-wrapper">
        <div className="create-account-logo">
          <img src="/busia-logo.png" alt="BusIA Logo" className="create-account-logo-image" />
        </div>
        
        <form className="create-account-form" onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>

          <div className="create-account-login-link">
            <span>¿Ya tienes una cuenta? </span>
            <Link to="/login" className="create-account-login-link-text">Inicia sesión aquí</Link>
          </div>

          <div className="create-account-form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              placeholder='Ingrese su nombre completo'
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={errors.name ? 'create-account-input-error' : ''}
            />
            {errors.name && <span className="create-account-error-message">{errors.name}</span>}
          </div>

          <div className="create-account-form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              placeholder='Ingrese su correo electrónico'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={errors.email ? 'create-account-input-error' : ''}
            />
            {errors.email && <span className="create-account-error-message">{errors.email}</span>}
          </div>
          
          <div className="create-account-form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              placeholder='Ingrese su contraseña'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={errors.password ? 'create-account-input-error' : ''}
            />
            {errors.password && <span className="create-account-error-message">{errors.password}</span>}
          </div>

          <div className="create-account-options">
            <div className="create-account-remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Recordarme</label>
            </div>
            <div className="create-account-terms">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className={errors.terms ? 'create-account-checkbox-error' : ''}
              />
              <label htmlFor="terms">
                Acepto los <Link to="/terms-and-conditions" className="create-account-terms-link">términos y condiciones</Link>
              </label>
              {errors.terms && <span className="create-account-error-message">{errors.terms}</span>}
            </div>
          </div>

          <button type="submit" className="create-account-button">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;