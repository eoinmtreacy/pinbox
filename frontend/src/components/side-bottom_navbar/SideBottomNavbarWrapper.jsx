import React from 'react'
import BottomNav from './BottomNav'
import SideNav from './SideNav'

const SideBottomNavbarWrapper = ({ isMobile, ...props}) => {
    return (
        <>
            {isMobile ? (
                <BottomNav isMobile={isMobile} {...props} />
            ) : (
                <SideNav isMobile={isMobile} {...props} />
            )}
        </>
    );
};

export default SideBottomNavbarWrapper