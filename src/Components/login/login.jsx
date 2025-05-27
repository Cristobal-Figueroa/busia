import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import userService from '../../services/userService';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Cargar email recordado si existe
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Autenticar con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Actualizar datos de último login en Realtime Database
      try {
        // Primero verificamos si el usuario ya existe en la base de datos
        const userData = await userService.getUserById(user.uid);
        
        if (userData) {
          // Si existe, actualizamos su último login
          await userService.updateUser(user.uid, {
            lastLogin: new Date().toISOString()
          });
        } else {
          // Si no existe (caso raro pero posible), creamos el registro
          await userService.saveUser(user.uid, {
            name: user.displayName || '',
            email: user.email,
            role: 'user',
            active: true,
            lastLogin: new Date().toISOString()
          });
        }
      } catch (dbError) {
        console.error('Error al actualizar datos de usuario en la base de datos:', dbError);
        // No interrumpimos el flujo de login por un error en la base de datos
      }
      
      // Si el checkbox de recordarme está marcado, configurar persistencia
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Redireccionar al home después de login exitoso
      navigate('/');
    } catch (err) {
      // Manejar errores de autenticación
      let errorMessage = 'Error al iniciar sesión';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Correo electrónico o contraseña incorrectos';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos fallidos. Intente más tarde';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Error de conexión. Verifique su conexión a internet';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-logo">
          <img src="/busia-logo.png" alt="BusIA Logo" className="login-logo-image" />
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          
          {error && <div className="login-error-message">{error}</div>}

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

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;