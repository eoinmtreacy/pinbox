import React, { useState } from 'react';
import Logo from '../../Images/logo.png';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScrollToSection = (event, sectionId) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-white fixed top-0 left-0 right-0 z-50">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">
                        <a href="/" title="" className="flex">
                            <img className="w-auto h-12 lg:h-20" src={Logo} alt="Logo" />
                        </a>
                    </div>

                    <div className="lg:hidden">
                        <button
                            type="button"
                            className="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"
                            onClick={toggleMenu}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div
                        className={`hidden lg:flex lg:items-center lg:justify-center lg:space-x-10 ${
                            menuOpen ? 'block' : 'hidden'
                        }`}
                    >
                        <button
                            onClick={(e) => handleScrollToSection(e, 'landing-section-3')}
                            className="text-2xl font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            Features
                        </button>
                        <button
                            onClick={(e) => handleScrollToSection(e, 'landing-section-5')}
                            className="text-2xl font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            Solutions
                        </button>
                        <button
                            onClick={(e) => handleScrollToSection(e, 'landing-section-8_1')}
                            className="text-2xl font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            Vision
                        </button>

                        <button
                            onClick={(e) => handleScrollToSection(e, 'landing-section-8')}
                            className="text-2xl font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            About Team
                        </button>
                    </div>

                    <a
                        href="/join"
                        title="Join Now"
                        className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
                        role="button"
                    >
                        Join Now
                    </a>
                </div>
            </div>
            {menuOpen && (
                <div className="lg:hidden bg-white w-full absolute top-16 left-0 py-5 space-y-4 shadow-lg h-screen">
                    <button
                        onClick={(e) => {
                            handleScrollToSection(e, 'landing-section-3');
                            toggleMenu();
                        }}
                        className="block w-full text-base text-black transition-all duration-200 hover:text-opacity-80 px-4 text-left"
                    >
                        Features
                    </button>
                    <button
                        onClick={(e) => {
                            handleScrollToSection(e, 'landing-section-5');
                            toggleMenu();
                        }}
                        className="block w-full text-base text-black transition-all duration-200 hover:text-opacity-80 px-4 text-left"
                    >
                        Solutions
                    </button>
                    <button
                        onClick={(e) => {
                            handleScrollToSection(e, 'landing-section-8_1');
                            toggleMenu();
                        }}
                        className="block w-full text-base text-black transition-all duration-200 hover:text-opacity-80 px-4 text-left"
                    >
                        Vision
                    </button>
                    <button
                        onClick={(e) => {
                            handleScrollToSection(e, 'landing-section-8');
                            toggleMenu();
                        }}
                        className="block w-full text-base text-black transition-all duration-200 hover:text-opacity-80 px-4 text-left"
                    >
                        Our Team
                    </button>

                    <a
                        href="/join"
                        title="Join Now"
                        className="block w-full text-base text-center transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full py-2.5 mx-4"
                        onClick={toggleMenu}
                    >
                        Join Now
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
