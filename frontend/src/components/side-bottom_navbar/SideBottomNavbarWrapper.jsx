import React from 'react'
import BottomNav from './BottomNav'
import SideNav from './SideNav'

const SideBottomNavbarWrapper = ({ isMobile, ...props}) => {
    return (
        <>
            {isMobile ? (
                <BottomNav {...props} />
            ) : (
                <SideNav {...props} />
            )}
        </>
    );
};

export default SideBottomNavbarWrapper