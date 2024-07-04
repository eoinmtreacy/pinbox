import React from 'react';
import PreferenceSelection from '../../Images/PreferenceSelection.png';
import LandingSection3 from '../../Images/Landing3-1.png';
const LandingSection4 = () => {
    return (
        <section id="landing-section-3" className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center mb-3 text-7xl font-bold tracking-tighter leading-[86px] text-slate-900 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                    Core Features
                </div>
                <div className="text-2xl font-semibold mb-3">
                    Discover the ultimate in personalized recommendations with PinBox!<br></br> We put your experience
                    first by considering two essential elements to suggest the most ideal spots just for you.
                </div>

                <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                    <div>
                        <img className="w-full rounded-3xl" src={PreferenceSelection} alt="Map" />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-black sm:text-4xl">Personalized Recommendations</h2>
                        <p className="mt-4 text-base font-semibold text-gray-600 sm:text-lg">
                            PinBox tailors your NYC journey with real-time, swipeable recommendations that suit your
                            mood—whether you want to chill at a less-crowded spot or go crazy at bustling markets.
                        </p>
                        <p className="mt-4 text-base font-semibold text-gray-600 sm:text-lg">
                            Navigate the city with ease using our interactive map. Find hidden gems promoted by local
                            businesses. Experience Manhattan through the eyes of locals with PinBox, making every trip
                            uniquely yours.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-black sm:text-4xl">Busyness Prediction</h2>
                        <p className="mt-4 text-base font-semibold text-gray-600 sm:text-lg">
                            PinBox provides accurate busyness levels based on unique New York City busyness data and
                            data from the Google Place API. Our service helps you make informed decisions by offering
                            information on the most crowded and less crowded places.
                        </p>
                        <p className="mt-4 text-base font-semibold text-gray-600 sm:text-lg">
                            Additionally, PinBox’s machine learning model analyzes the busyness of various places at
                            different times of the day to provide relevant suggestions. With this integrated feature,
                            you always know the best time to visit your favorite spots.
                        </p>
                    </div>
                    <div>
                        <img className="w-full rounded-3xl" src={LandingSection3} alt="Map" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingSection4;
