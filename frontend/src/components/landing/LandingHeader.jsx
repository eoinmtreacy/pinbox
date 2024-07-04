import React from 'react';
import Logo from '../../Images/logo.png';

const Header = () => {
    const handleScrollToSection = (event, sectionId) => {
        console.log('Pressed');
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="bg-white fixed top-0 left-0 right-0 z-50">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">
                        <a href="/" title="" className="flex">
                            <img className="w-auto h-20" src={Logo} alt="Logo" />
                        </a>
                    </div>

                    <button
                        type="button"
                        className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                    ></button>

                    <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                        <button
                            onClick={(e) => handleScrollToSection(e, 'landing-section-3')}
                            className="text-base text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            Features
                        </button>
                        <a
                            href="#solutions"
                            title="Solutions"
                            className="text-base text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            Solutions
                        </a>
                        <a
                            href="#resources"
                            title="Resources"
                            className="text-base text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            Resources
                        </a>
                        <a
                            href="#pricing"
                            title="Pricing"
                            className="text-base text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            Pricing
                        </a>
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
        </header>
    );
};

export default Header;
