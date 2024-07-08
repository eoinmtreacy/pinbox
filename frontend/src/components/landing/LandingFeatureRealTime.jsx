import React from 'react';
import Heatmap from '../../Images/heatmap.png';
import '../../App.css';
const LandingFeatureRealTime = () => {
    return (
        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-5xl sm:px-6 lg:px-8">
                <div className=" text-center text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-zinc-900 mb-8 uppercase">
                    Real-time Data and Insights
                </div>
                <div className="text-center text-sm sm:text-base font-semibold text-gray-700 mb-8">
                    Access the latest updates on busyness levels across Manhattan and explore hidden gems with ease.
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                    <div className="flex flex-col items-center lg:items-start bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-black">Real-time Data</h3>
                        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-600">
                            Access the latest updates on how busy different areas in Manhattan are, so you can plan your
                            day effortlessly and avoid the crowds.
                        </p>
                    </div>
                    <div className="flex flex-col items-center lg:items-start bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-black">Color Visualization</h3>
                        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-600">
                            Easily understand the busyness levels with a color-coded map, ranging from green (less busy)
                            to red (busy).
                        </p>
                    </div>
                    <div className="flex flex-col items-center lg:items-start bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-black">Explore Hidden Gems</h3>
                        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-600">
                            Discover lesser-known areas that are not overcrowded, allowing you to explore unique and
                            authentic experiences.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center mt-8 lg:mt-12 ">
                    <img
                        className="w-full max-w-xs sm:max-w-sm lg:max-w-3xl rounded-lg shadow-md "
                        src={Heatmap}
                        alt="Map"
                    />
                </div>
            </div>
        </section>
    );
};

export default LandingFeatureRealTime;
