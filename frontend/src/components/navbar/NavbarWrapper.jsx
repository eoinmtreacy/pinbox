import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../auth/AuthContext'
import axios from '../../api/axios'
import TopNav from './TopNav'
import MobileIcons from './MobileIcons'

const NavbarWrapper = ({ isMobile, ...props}) => {
    const { user, setAuth, setUser } = useAuthContext();
    const navigate = useNavigate();

    const handleLoginLogoutClick = async () => {
        if (user == null) {
            navigate('/login'); 
        } else {
            try {
                const response = await axios.get('/user/logout', { withCredentials: true })
                if (response.status == 200) {
                    
                    setAuth(false)
                    setUser(null)
                    navigate('/mainpage');
                }
                
            } catch (error) {
                console.error(error);
            }
        };
    }

    return (
        <>
            {isMobile ? (
                <MobileIcons {...props} handleLoginLogoutClick={handleLoginLogoutClick} />
            ) : (
                <TopNav {...props} handleLoginLogoutClick={handleLoginLogoutClick}/>
            )}
        </>
    );
};

export default NavbarWrapper