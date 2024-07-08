import React from 'react';
import { useNavigate } from 'react-router-dom';
import Landing1 from '../../Images/Landing1.png';

const LandingFirst = () => {
    const navigate = useNavigate();
    const signup = () => {
        navigate('/signup'); // Navigate to the login page
    };

    return (
        <section className="flex items-center  bg-[#FCF8F1] bg-opacity-30 h-full  justify-center w-full overflow-x-hidden">
            <div className="mx-auto w-full max-w-7xl sm:px-4 ">
                <div className="grid items-center grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-2 w-full  tracking-wider ">
                    <div className="text-center lg:text-left w-full">
                        <p className="text-5xl sm:text-4xl font-bold tracking-wider uppercase">Welcome to PinBox!</p>
                        <p className="text-sm sm:text-base font-semibold tracking-wider text-blue-600 uppercase">
                            A Trip Advisor for Enjoying Manhattan in New York
                        </p>
                        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black lg:mt-8">
                            Share & Connect Extraordinary Places with Friends
                        </h1>
                        <p className="mt-4 font-semibold text-black lg:mt-8 sm:text-lg lg:text-xl">
                            Find a Hidden Gem in Manhattan!
                        </p>

                        <a
                            href="#"
                            title=""
                            onClick={signup}
                            className="inline-flex items-center px-4 py-3 sm:px-6 sm:py-4 mt-6 sm:mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                            role="button"
                        >
                            Join for free
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 ml-4 sm:ml-8 -mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </a>

                        <p className="mt-5 text-gray-600">
                            Already joined us?{' '}
                            <a title="" className="text-black transition-all duration-200 hover:underline">
                                Log in
                            </a>
                        </p>
                    </div>

                    <div className="flex justify-center lg:justify-end mt-8 lg:mt-0 w-full">
                        <img className="w-full max-w-xs lg:max-w-full" src={Landing1} alt="Hero" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingFirst;
