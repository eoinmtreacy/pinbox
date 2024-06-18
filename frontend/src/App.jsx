import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import custom CSS for the App
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for map styling
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
                    {/* Only render BottomNav on certain paths */}
                    <Route path="/map" element={<BottomNav />} />
                    <Route path="*" element={null} /> {/* Catch-all to handle other cases */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;