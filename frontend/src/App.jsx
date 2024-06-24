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

function App() {
    return (
        <div className="App flex flex-col min-h-screen">
            {/* Router component wraps all the route definitions */}
            <Router>
                <div className="flex flex-1">
                    <div className="flex-1">
                        {/* Define main routes for different pages */}
                        <Routes>
                            <Route path="/" element={<Main />} /> {/* Main page */}
                            <Route path="/map" element={<Map />} /> {/* Map page with SideNav */}
                            <Route path="/login" element={<Login />} /> {/* Login page */}
                            <Route path="/signup" element={<Signup />} /> {/* Signup page */}
                            <Route path="/passwordfind" element={<PasswordFind />} /> {/* Password find page */}
                            <Route path="/preference" element={<Preference />} /> {/* Password find page */}
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
