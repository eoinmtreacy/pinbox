import React from 'react'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

const NavbarWrapper = ({ isMobile, ...props}) => {
    return (
        <>
            {isMobile ? (
                <NavbarMobile {...props} />
            ) : (
                <NavbarDesktop {...props} />
            )}
        </>
    );
};

export default NavbarWrapper