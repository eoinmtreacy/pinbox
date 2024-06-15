import React from 'react';
import Loginimg from '../Images/appimage.png';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import 'leaflet/dist/leaflet.css';
function Login() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/map');
    };
    return (
        <div className="container px-4">
            <h1 className="text-center text-2xl font-bold my-4">Login</h1>
            <div className="max-w-sm mx-auto p-8 rounded-lg border border-solid border-[#020202]">
                <img src={Loginimg} alt="Loginimg" className="mx-auto" />
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
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
                            type="password"
                            id="password"
                            className="border rounded w-full py-2 px-3 text-grey-darker mb-3"
                            required
                        />
                    </div>
                    <div className=" mb-4">
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="www"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleLoginClick}
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
