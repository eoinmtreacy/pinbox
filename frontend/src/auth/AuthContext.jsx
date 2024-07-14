import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("/user/auth",
                    { withCredentials: true }
                )
                if (response.status === 200) {
                    setAuth(true)
                    setUser(response.data.pinboxId)
                    console.log(user, isAuth);
                    return
                }
                setAuth(false)
                setUser(null)
            } catch (err) {
                console.error(err)
                setAuth(false)
                setUser(null)
            }
        }

        checkAuth()

    }, [isAuth, user])

    return (
        <AuthContext.Provider value={{ isAuth, setAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};