import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Header from "./Components/Header/Header";
import Home from './Components/home/home';
import Login from './Components/login/login';
import Desktop from './Components/desktop/desktop';
import MyProfile from './Components/myProfile/myProfile';
import FleetTable from './Components/fleetTable/fleetTable';
import DriversTable from './Components/driversTable/driversTable';
import AdminData from './Components/adminData/adminData';
import CreateAccount from './Components/createAccount/createAccount';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

// Componente contenedor que decide si mostrar el Header o no
function AppContent() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/createAccount';

  return (
    <div className="app">
      {!isLoginPage && <Header />}
      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/createAccount" element={currentUser ? <Navigate to="/" /> : <CreateAccount />} />
          
          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/desktop" element={
            <ProtectedRoute>
              <Desktop />
            </ProtectedRoute>
          } />
          <Route path="/myProfile" element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          } />
          <Route path="/fleetTable" element={
            <ProtectedRoute>
              <FleetTable />
            </ProtectedRoute>
          } />
          <Route path="/driversTable" element={
            <ProtectedRoute>
              <DriversTable />
            </ProtectedRoute>
          } />
          <Route path="/adminData" element={
            <ProtectedRoute>
              <AdminData />
            </ProtectedRoute>
          } />
          
          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" />} />
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