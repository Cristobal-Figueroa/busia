import { Link } from 'react-router-dom';
import './header.css';

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}