import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BoardPage from './pages/BoardPage';
import HomePage from './pages/HomePage';
import NavBar from './components/Navbar';
import ProfileCreationPage from './pages/ProfileCreationPage';
import ProfilePage from './pages/ProfilePage';
import { SessionContext } from './contexts/SessionContext';

// PrivateRoute component for route protection
function PrivateRoute({ children }) {
    const { token } = useContext(SessionContext);  // Access token from SessionContext
    return token ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protect Board, Profile, and Profile Creation routes */}
                <Route
                    path="/board"
                    element={
                        <PrivateRoute>
                            <BoardPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile-creation"
                    element={
                        <PrivateRoute>
                            <ProfileCreationPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
