import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import custom CSS for the App
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for map styling
import SideBarWrapper from './components/SideBarWrapper'; // Import the SideBarWrapper component
import Map from './components/Map'; // Import the Map component
import BottomNav from './components/BottomNav'; // Import the BottomNav component
import Login from './components/Login'; // Import the Login component
import Signup from './components/Signup'; // Import the Signup component
import Main from './components/Main'; // Import the Main component
import PasswordFind from './components/PasswordFind'; // Import the PasswordFind component


function App() {
    return (
        <div className="App flex flex-col min-h-screen">
            {/* Router component wraps all the route definitions */}
            <Router>
                <div className="flex flex-1">
                    {/* Conditional rendering of the Sidebar component */}
                    <SideBarWrapper />
                    <div className="flex-1">
                        {/* Define main routes for different pages */}
                        <Routes>
                            <Route path="/" element={<Main />} /> {/* Main page */}
                            <Route path="/map" element={<Map />} /> {/* Map page */}
                            <Route path="/login" element={<Login />} /> {/* Login page */}
                            <Route path="/signup" element={<Signup />} /> {/* Signup page */}
                            <Route path="/passwordfind" element={<PasswordFind />} /> {/* Password find page */}
                        </Routes>
                    </div>
                </div>
                {/* Conditional rendering of the BottomNav component */}
                <Routes>
                    {/* Do not render BottomNav on login, signup, or password find pages */}
                    <Route path="/login" element={null} />
                    <Route path="/signup" element={null} />
                    <Route path="/passwordfind" element={null} />
                    {/* Render BottomNav on all other paths */}
                    <Route path="*" element={<BottomNav />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;