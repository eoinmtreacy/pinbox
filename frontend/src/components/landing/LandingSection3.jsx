import React from 'react';
import PreferenceSelection from '../../Images/PreferenceSelection.png';
import LandingSectionImg from '../../Images/Landing3-1.png';

const LandingSection3 = () => {
    return (
        <section id="landing-section-3" className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-5xl sm:px-6 lg:px-8">
                <div className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight text-slate-900 mb-8">
                    Core Features
                </div>
                <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col items-center lg:items-start bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                            Personalized Recommendations
                        </h2>
                        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-600">
                            PinBox tailors your NYC journey with real-time, swipeable recommendations that suit your
                            mood—whether you want to chill at a less-crowded spot or go crazy at bustling markets.
                        </p>
                        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-600">
                            Navigate the city with ease using our interactive map. Find hidden gems promoted by local
                            businesses. Experience Manhattan through the eyes of locals with PinBox, making every trip
                            uniquely yours.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img
                            className="w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-lg shadow-md"
                            src={PreferenceSelection}
                            alt="Map"
                        />
                    </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12 mt-6">
                    <div className="flex flex-col items-center lg:items-start bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Busyness Prediction</h2>
                        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-600">
                            PinBox provides accurate busyness levels based on unique New York City busyness data and
                            data from the Google Place API. Our service helps you make informed decisions by offering
                            information on the most crowded and less crowded places.
                        </p>
                        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-600">
                            Additionally, PinBox’s machine learning model analyzes the busyness of various places at
                            different times of the day to provide relevant suggestions. With this integrated feature,
                            you always know the best time to visit your favorite spots.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img
                            className="w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-lg shadow-md"
                            src={LandingSectionImg}
                            alt="Map"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingSection3;
