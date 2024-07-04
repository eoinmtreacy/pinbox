import React from 'react';
import Signup from '../Signup';
import Landing3 from '../../Images/Landing2-1.jpg';

const LandingSection2 = () => {
    return (
        <section className="bg-[#FCF8F1] bg-opacity-30 h-screen flex items-center">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="mt-20 text-7xl font-bold tracking-tighter leading-[86px] text-slate-900 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                    Crowded or Chill? Let PinBox Guide You!
                </div>

                <div className="text-2xl font-semibold text-center mt-10 mb-10">
                    Big Dilemma! Emergency! Ever wondered where to hit up when you’re on a trip? <br></br>Crowded spots?
                    Maybe somewhere chill today? PinBox has got you covered.<br></br> This is the ultimate solution for
                    all your travel dilemmas!
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
                        src={Landing3}
                        className="object-cover absolute inset-0 size-full w-[1200px] h-[450px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default LandingSection2;
