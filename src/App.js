import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BoardPage from './pages/BoardPage';
import HomePage from './pages/HomePage';
import NavBar from './components/Navbar';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
