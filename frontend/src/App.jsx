import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line
import SideBar from './components/Sidebar';
import Map from './components/Map';
// eslint-disable-next-line
import BottomNav from './components/BottomNav';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import PasswordFind from './components/PasswordFind';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/passwordfind" element={<PasswordFind />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
