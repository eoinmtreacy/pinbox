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
import BusynessTable from './components/Map/BusynessTable';
import SideNav from './components/SideNav'; // Import the SideNav component

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
    const hideSideNav = ['/login', '/signup', '/', '/main'].includes(location.pathname.toLowerCase());

    return (
        <div className="flex flex-1">
            {!hideSideNav && (
                <div className="flex-none w-1/24 h-full">
                    <SideNav
                        onPreferenceToggle={() => {}}
                        onFriendsToggle={() => {}}
                    />
                </div>
            )}
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
                    <Route path="/busytable" element={<BusynessTable />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
