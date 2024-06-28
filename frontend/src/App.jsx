import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Map from './components/Map';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import PasswordFind from './components/PasswordFind';
import Preference from './components/Preference';
import Profile from './components/Profile';
import Settings from './components/Settings';
import SideNav from './components/SideNav';

function App() {
    const [showPreference, setShowPreference] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [mapInstance, setMapInstance] = useState(null);

    const handlePreferenceToggle = () => {
        setShowPreference((prev) => !prev);
    };

    const handleFriendsToggle = () => {
        setShowFriends((prev) => !prev);
    };

    return (
        <div className="App flex flex-col min-h-screen">
            <Router>
                <AppContent
                    onPreferenceToggle={handlePreferenceToggle}
                    onFriendsToggle={handleFriendsToggle}
                    showPreference={showPreference}
                    showFriends={showFriends}
                    mapInstance={mapInstance}
                    setMapInstance={setMapInstance}
                />
            </Router>
        </div>
    );
}

const AppContent = ({
    onPreferenceToggle,
    onFriendsToggle,
    showPreference,
    showFriends,
    mapInstance,
    setMapInstance,
}) => {
    const location = useLocation();
    const hideSideNav = ['/login', '/signup'].includes(location.pathname);

    return (
        <div className="flex flex-1">
            {!hideSideNav && <SideNav onPreferenceToggle={onPreferenceToggle} onFriendsToggle={onFriendsToggle} />}
            {showPreference && (
                <div className="w-2/12 bg-gray-100 ml-[100px] mt-[100px]">
                    <Preference mapInstance={mapInstance} />
                </div>
            )}
            <div className={!hideSideNav ? `flex-1 ml-[70px] ${showPreference ? 'w-5/12' : 'w-10/12'}` : 'flex-1'}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                        path="/map"
                        element={<Map onPreferenceToggle={onPreferenceToggle} setMapInstance={setMapInstance} />}
                    />
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
