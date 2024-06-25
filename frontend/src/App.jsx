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
import SideNav from './components/SideNav'; // Ensure SideNav is imported

function App() {
    return (
        <div className="App flex flex-col min-h-screen">
            <Router>
                <SideNav /> {/* Ensure SideNav is always displayed */}
                <div className="flex flex-1">
                    <div className="flex-1 ml-[70px]"> {/* Add left margin to account for SideNav width */}
                        <Routes>
                            <Route path="/" element={<Main />} /> {/* Main page */}
                            <Route path="/map" element={<Map />} /> {/* Map page with SideNav */}
                            <Route path="/login" element={<Login />} /> {/* Login page */}
                            <Route path="/signup" element={<Signup />} /> {/* Signup page */}
                            <Route path="/passwordfind" element={<PasswordFind />} /> {/* Password find page */}
                            <Route path="/preference" element={<Preference />} /> {/* Preference page */}
                            <Route path="/profile" element={<Profile />} /> {/* Profile page */}
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
