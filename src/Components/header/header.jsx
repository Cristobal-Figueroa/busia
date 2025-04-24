import { Link } from 'react-router-dom';
import './Header.css';

export function Header() {
  return (
    <header>
      <nav> nav sirve para 
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}