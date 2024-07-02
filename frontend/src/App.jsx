import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Login from './components/Login';
import Signup from './components/Signup';
import PasswordFind from './components/PasswordFind';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Main from './components/Main';
import MainPage from './components/MainPage';

function App() {
    return (
        <div className="App flex flex-col min-h-screen">
            <Router>
                <AppContent />
            </Router>
        </div>
    );
}

const AppContent = () => {
    const location = useLocation();
    const hideSideNav = ['/login', '/signup'].includes(location.pathname);

    return (
        <div className="flex flex-1">
            <div className={!hideSideNav ? 'flex-1 ml-[70px]' : 'flex-1'}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/mainpage" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/passwordfind" element={<PasswordFind />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
