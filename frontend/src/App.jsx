// src/App.jsx
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
import LandingMain from './components/landing/LandingMain';

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
    const hideSideNav = ['/Login', '/Signup','/Main'].includes(location.pathname);

    return (
        <div className="flex flex-1">
            <div className={!hideSideNav ? 'flex-1 ml-for-desktop' : 'flex-1'}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/mainpage/:pinbox_id?" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/passwordfind" element={<PasswordFind />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/landingpage/*" element={<LandingMain />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
