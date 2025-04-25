import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">BUSIA</Link>
        </div>
        <nav className="nav-menu">
          <button className="nav-button">ESCRITORIO</button>
          <button className="nav-button">MI CUENTA</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;