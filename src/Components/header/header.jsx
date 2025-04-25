import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  
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

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">BusIA</Link>
        </div>
        <nav className="header-nav-menu">
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
                <Link to="/fleetTable" className="header-dropdown-item">Flota</Link>
                <Link to="/driversTable" className="header-dropdown-item">Conductores</Link>
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
              Mi Cuenta
            </div>
            {showAccountMenu && (
              <div className="header-dropdown-menu">
                <Link to="/login" className="header-dropdown-item">Login</Link>
                <Link to="/myProfile" className="header-dropdown-item">Mi Perfil</Link>
                <Link to="/adminData" className="header-dropdown-item">Datos del Administrador</Link>
                <Link to="/logout" className="header-dropdown-item">Logout</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;