import React from 'react';
import Signup from '../Signup';
import Landing3 from '../../Images/Landing2-1.jpg';

const LandingPreview = () => {
    const handleSignup = (event) => {
        event.preventDefault();
        Signup();
    };

    return (
        <section
            id="landing-section-2"
            className="bg-[#FCF8F1] bg-opacity-30 h-full flex flex-col items-center justify-center px-4 lg:px-0 w-full overflow-x-hidden"
        >
            <div className="flex flex-col items-center justify-center w-full max-w-7xl sm:px-6 lg:px-8">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-zinc-900 mb-8 uppercase">
                    Meet PinBox!
                </div>
                <div className="text-center text-base sm:text-lg mt-4 sm:mt-6 lg:mt-8 font-semibold text-gray-700">
                    Crowded or Chill? Let PinBox Guide You! Big Dilemma! Emergency!<br /> Ever wondered where to hit up
                    when you’re on a trip? Crowded spots? Maybe
                    <br />
                    somewhere chill today? PinBox has got you covered. This is the ultimate solution for all your travel
                    dilemmas!
                </div>
                <div className="mt-8 sm:mt-10 lg:mt-12">
                    <button
                        onClick={handleSignup}
                        className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full hover:bg-yellow-400 focus:bg-yellow-400"
                    >
                        Join for free
                    </button>
                </div>
                <div className="flex items-center justify-center mt-8 sm:mt-10 lg:mt-12">
                    <img src={Landing3} className="w-full max-w-md sm:max-w-lg lg:max-w-2xl rounded-lg shadow-md" alt="Landing Preview" />
                </div>
            </div>
        </section>
    );
};

export default LandingPreview;