import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuthContext } from '../auth/AuthContext'
import '../App.css';


async function handleSubmit(e, setErrors) {
    e.preventDefault();
    // attempt sign up 
    try {
        const response = axios.post('/user/add-user', {
            email: e.target.email.value,
        })
    } catch (error) {
        console.error(error)
    }

}

function Signup() {
    const navigate = useNavigate();
    const { isAuth, setAuth, user, setUser } = useAuthContext();

    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSetPassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSetConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // attempt sign up
        try {
            const response = await axios.post('/user/add-user', {
                pinboxId: e.target.pinboxId.value,
                email: e.target.email.value,
                username: e.target.email.value,
                password: e.target.password.value,
            });

            if (response.status != 200) {
                alert('Sign up failed');
                return
            }
        } catch (error) {
            console.error(error);
        }
        
        // attempt login
        try {
            const response = await axios.post('/user/login', {
                email: e.target.email.value,
                password: e.target.password.value
            }, {
                withCredentials: true 
            });
            if (response.status !== 200) {
                alert('Login failed'); // placeholder, elegant error handling needed
                return;
            }

        } catch (error) {
            console.error(error);
        }

        try {
            const response = await axios.get('/user/auth', { withCredentials: true });
            if (response.status === 200) {
                setAuth(true);
                setUser(response.data.pinboxId);
                navigate(`/mainpage/${response.data.pinboxId}`);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container px-4">
            <h1 className="text-center text-2xl font-bold my-4">Sign up</h1>
            <div className="max-w-sm mx-auto p-8 rounded-lg border-solid border-[#020202]">

                <form onSubmit={(e) => handleSubmit(e)}>
                    {errors.length > 0 && errors.map((error, index) => (
                        <div key={index} className="error-message">
                            {error}
                        </div>
                    ))}

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="pinbox_id">
                            Username
                        </label>
                        <input
                            name="pinboxId"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="border rounded w-full py-2 px-3 text-grey-darker mb-3"
                            value={password}
                            onChange={handleSetPassword}
                            required
                        />

                       <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            className="border rounded w-full py-2 px-3 text-grey-darker mb-3"
                            value={confirmPassword}
                            onChange={handleSetConfirmPassword}
                            required
                        />
                    </div>

                    {password === confirmPassword ? (

                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            sign up
                        </button>
                    </div>
 
                    ) : 
                    
                    <div>
                        Passwords must match
                    </div>
                    }
               </form>
            </div>
        </div>
    );
}

export default Signup;