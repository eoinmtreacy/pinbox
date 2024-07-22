import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../auth/AuthContext";
import axios from "../../../api/axios";

const LoginLogout = () => {
    const navigate = useNavigate();
    const { user, setUser, setAuth } = useAuthContext();

    const handleLoginLogoutClick = async () => {
        if (user === null) {
            navigate('/login');
        } else {
            try {
                const response = await axios.get('/user/logout', { withCredentials: true })
                if (response.status === 200) {

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
        <button
            onClick={handleLoginLogoutClick}
            className="text-xs bg-blue-500 text-white rounded p-1"
        >
            {user !== null ? 'Logout' : 'Login'}
        </button>
    )
}

export default LoginLogout;