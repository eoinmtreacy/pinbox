import React from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './Sidebar';

const SideBarWrapper = () => {
    const location = useLocation();
    const noSidebarPaths = ['/login', '/signup', '/passwordfind', '/map'];
    
    if (noSidebarPaths.includes(location.pathname)) {
        return null;
    }

    return <SideBar />;
};

export default SideBarWrapper;