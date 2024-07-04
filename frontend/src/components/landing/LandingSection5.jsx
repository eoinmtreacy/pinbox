import React from 'react';
import Signup from '../Signup';
import Landing2 from '../../Images/Landing2.png';

const LandingSection5 = () => {
    return (
        <section className="bg-[#FCF8F1] bg-opacity-30 h-screen flex items-center">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="mt-20 text-7xl font-bold tracking-tighter leading-[86px] text-slate-900 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                    Discover Your Friends' Favourite Places!
                </div>

                <div className="flex justify-center mt-11 mb-7 text-2xl font-semibold leading-10 w-[1200px] max-md:mt-3 max-md:max-w-full">
                    Explore Your Friends' Saved Pinbox Spots and Collaborate! <br></br>Discover your friends' favorite
                    and less preferred places saved in their Pinbox.<br></br>Plus, collaborate on the spots they've
                    created!
                </div>
                <div className="flex justify-center items-center">
                    <a
                        href="#"
                        title=""
                        onClick={Signup}
                        className="inline-flex items-center px-6 py-4 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full hover:bg-yellow-400 focus:bg-yellow-400"
                        role="button"
                    >
                        Join for free
                        <svg
                            className="w-6 h-6 ml-8 -mr-2"
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
                </div>
                <div className="flex overflow-hidden relative z-10 flex-col items-center self-stretch px-10 mt-7 text-base leading-7 min-h-[580px] pb-[594px] max-md:px-5 max-md:pb-10 max-md:max-w-full rounded-2xl">
                    <img
                        loading="lazy"
                        src={Landing2}
                        className="object-cover absolute inset-0 size-full w-[1200px] h-[450px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default LandingSection5;
