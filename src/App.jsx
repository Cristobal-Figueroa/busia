import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from "./Components/Header/Header";
import Home from './Components/home/home';
import Login from './Components/login/login';
import Desktop from './Components/desktop/desktop';
import MyProfile from './Components/myProfile/myProfile';

// Componente contenedor que decide si mostrar el Header o no
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app">
      {!isLoginPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/desktop" element={<Desktop />} />
          <Route path="/myProfile" element={<MyProfile />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;