import * as React from 'react';
import Community from '../../Images/community.png';
import Queue from '../../Images/queue.png';
import Memory from '../../Images/memory.png';

function LandingSection8_1() {
    return (
        <section id="landing-section-8_1" className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight text-slate-900 mb-8">
                    Vision : We can do it together!
                </div>
                <div className="text-center text-base sm:text-xl font-semibold text-gray-700 mb-8">
                    Our team believes that every traveller in the world should travel for themselves.
                    <br />
                    PinBox helps promote local communities by highlighting hidden gems and lesser-known places.
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                        <img
                            src={Memory}
                            alt="Tourist in New York"
                            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
                        />
                        <h3 className="text-2xl sm:text-3xl font-bold text-black text-center">
                            Leave Best Memory for Tourists
                        </h3>
                        <p className="mt-4 text-base sm:text-lg font-semibold text-gray-600 text-center">
                            It recommends places to visit just for you. It perfectly analyses your preferences and
                            Manhattan's busyness to recommend the best places for you - whether it's busy or quiet!
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                        <img
                            src={Queue}
                            alt="Boosting Unpopular Spots"
                            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
                        />
                        <h3 className="text-2xl sm:text-3xl font-bold text-black text-center">
                            Boosting Unpopular Spots
                        </h3>
                        <p className="mt-4 text-base sm:text-lg font-semibold text-gray-600 text-center">
                            Business owners can gauge how interested potential consumers are in their offerings. Owners
                            can pay to advertise their lesser-known places as less busy and more appealing to tourists.
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                        <img
                            src={Community}
                            alt="Support Local Communities"
                            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
                        />
                        <h3 className="text-2xl sm:text-3xl font-bold text-black text-center">
                            Support Local Communities
                        </h3>
                        <p className="mt-4 text-base sm:text-lg font-semibold text-gray-600 text-center">
                            At PinBox, we want your local community to be more active. We believe that your happiness
                            will make your neighbourhood more vibrant, and it's our mission to develop services that
                            make more people happy.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingSection8_1;
