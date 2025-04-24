import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Components/layout/Header';
import { Home } from './Components/pages/Home';
import { Login } from './Components/pages/Login';
import { Register } from './Components/pages/Register';
import { Dashboard } from './Components/pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;