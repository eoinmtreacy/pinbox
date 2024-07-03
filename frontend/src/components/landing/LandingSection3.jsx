import React from 'react';

const LandingSection3 = () => {
    return (
        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                    <div>
                        <img
                            className="w-full"
                            src="https://via.placeholder.com/600x400" // replace with your image source
                            alt="Map"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-black sm:text-4xl">Personalized Recommendations</h2>
                        <p className="mt-4 text-base text-gray-600 sm:text-lg">
                            PinBox tailors your NYC journey with real-time, swipeable recommendations that suit your
                            mood—whether you want to chill at a less-crowded spot or go crazy at bustling markets.
                        </p>
                        <p className="mt-4 text-base text-gray-600 sm:text-lg">
                            Navigate the city with ease using our interactive map. Find hidden gems promoted by local
                            businesses. Experience Manhattan through the eyes of locals with PinBox, making every trip
                            uniquely yours.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingSection3;
