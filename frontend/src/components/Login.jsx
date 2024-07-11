import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loginimg from '../Images/logo.png';
import '../App.css';
import 'leaflet/dist/leaflet.css';

function Login() {
    const navigate = useNavigate();

    const handleLoginClick = async (event) => {
        event.preventDefault(); 
        const response = await fetch('http://localhost:5165/login?useCookies=true', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: event.target.elements.email.value,
                password: event.target.elements.password.value
            })
        });
        if (response.status == 200) {
            // const data  = await response.json()
            // const pinbox_Id = data.pinbox_Id;
            // console.log(pinbox_Id);
            navigate(`/mainpage/`);
        }
        else {
            console.log(response);
        }
        
    };

    const handleForgotPasswordClick = () => {
        navigate('/passwordfind'); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
                <img src={Loginimg} alt="Loginimg" className="mx-auto mb-4" />
                <form onSubmit={handleLoginClick}>
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
                            required
                        />
                    </div>

                    <div className="mb-4 text-center">
                        <button
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            onClick={handleForgotPasswordClick}
                            type="button"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
