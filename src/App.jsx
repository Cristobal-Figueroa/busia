import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from "./Components/header/header";
import { Home } from './Components/pages/home';
import { Login } from './Components/pages/login';
import { Register } from './Components/pages/register';
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