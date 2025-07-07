import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './header.css';

function Header() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const { currentUser, userData, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const accountDropdownRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  
  let accountTimeoutId = useRef(null);
  let desktopTimeoutId = useRef(null);

  // Manejadores para el menú de Mi Cuenta
  const handleAccountMouseEnter = () => {
    if (accountTimeoutId.current) {
      clearTimeout(accountTimeoutId.current);
      accountTimeoutId.current = null;
    }
    setShowAccountMenu(true);
  };

  const handleAccountMouseLeave = () => {
    accountTimeoutId.current = setTimeout(() => {
      setShowAccountMenu(false);
    }, 300);
  };

  // Manejadores para el menú de Escritorio
  const handleDesktopMouseEnter = () => {
    if (desktopTimeoutId.current) {
      clearTimeout(desktopTimeoutId.current);
      desktopTimeoutId.current = null;
    }
    setShowDesktopMenu(true);
  };

  const handleDesktopMouseLeave = () => {
    desktopTimeoutId.current = setTimeout(() => {
      setShowDesktopMenu(false);
    }, 300);
  };

  // Limpiar los timeouts cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (accountTimeoutId.current) {
        clearTimeout(accountTimeoutId.current);
      }
      if (desktopTimeoutId.current) {
        clearTimeout(desktopTimeoutId.current);
      }
    };
  }, []);
  
  // Manejar el cierre de sesión
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">BusIA</Link>
        </div>
        <nav className="header-nav-menu">
          {/* Enlaces directos */}
          <div className="header-nav-links">
            <Link to="/" className={`header-nav-link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
            <Link to="/mapa" className={`header-nav-link ${location.pathname === '/mapa' ? 'active' : ''}`}>Mapa</Link>
            <Link to="/fleetVehicles" className={`header-nav-link ${location.pathname === '/fleetVehicles' ? 'active' : ''}`}>Flota</Link>
          </div>
          
          {/* Menú desplegable de Escritorio */}
          <div 
            className="header-dropdown-container"
            ref={desktopDropdownRef}
            onMouseEnter={handleDesktopMouseEnter}
            onMouseLeave={handleDesktopMouseLeave}
          >
            <div className="header-nav-button header-dropdown-trigger">
              Escritorio
            </div>
            {showDesktopMenu && (
              <div className="header-dropdown-menu">
                <Link to="/fleetVehicles" className="header-dropdown-item">Flota de Vehículos</Link>
                <Link to="/mapa" className="header-dropdown-item">Mapa de Buses</Link>
              </div>
            )}
          </div>
          
          {/* Menú desplegable de Mi Cuenta */}
          <div 
            className="header-dropdown-container"
            ref={accountDropdownRef}
            onMouseEnter={handleAccountMouseEnter}
            onMouseLeave={handleAccountMouseLeave}
          >
            <div className="header-nav-button header-dropdown-trigger">
              {currentUser ? (
                <span className="header-user-info">
                  {userData?.name || currentUser.displayName || currentUser.email}
                </span>
              ) : (
                'Mi Cuenta'
              )}
            </div>
            {showAccountMenu && (
              <div className="header-dropdown-menu">
                {currentUser ? (
                  <>
                    <Link to="/myProfile" className="header-dropdown-item">Mi Perfil</Link>
                    <Link to="/adminData" className="header-dropdown-item">Datos del Administrador</Link>
                    <button onClick={handleSignOut} className="header-dropdown-item header-signout-button">Cerrar Sesión</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="header-dropdown-item">Ingresar</Link>
                    <Link to="/createAccount" className="header-dropdown-item">Registrarme</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;