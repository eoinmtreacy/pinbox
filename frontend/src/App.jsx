import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    return (
        <div className="App flex flex-col min-h-screen">
            <Router>
                <SideNav />
                <div className="flex flex-1 ml-[70px]"> {/* Add left margin to account for SideNav width */}
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/map" element={<Map />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/passwordfind" element={<PasswordFind />} />
                            <Route path="/preference" element={<Preference />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;