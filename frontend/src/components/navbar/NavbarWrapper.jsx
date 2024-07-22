import React from 'react'
import TopNav from './TopNav'
import MobileIcons from './MobileIcons'

const NavbarWrapper = ({ isMobile, ...props}) => {
    return (
        <>
            {isMobile ? (
                <MobileIcons {...props} />
            ) : (
                <TopNav {...props} />
            )}
        </>
    );
};

export default NavbarWrapper