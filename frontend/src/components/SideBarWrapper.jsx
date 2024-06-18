import React from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './Sidebar';

const SideBarWrapper = () => {
    const location = useLocation();
    console.log("Current Path:", location.pathname); // Debugging log

    const noSidebarPaths = ['./Login', './Signup', './PasswordFind', './Map'];
    
    if (noSidebarPaths.includes(location.pathname)) {
        return null;
    }

    return <SideBar />;
};

export default SideBarWrapper;