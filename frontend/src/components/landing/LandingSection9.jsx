import React from 'react';

const LandingSection9 = () => {
    return (
        <section className="bg-[#FCF8F1] bg-opacity-30 h-full flex items-center justify-center px-4 lg:px-0 w-full overflow-x-hidden">
            <div className="mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <p className="text-sm sm:text-base font-medium text-gray-600 font-pj">
                            2,157 Users have said how good Pinbox!
                        </p>
                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                            Our happy clients say about us
                        </h2>
                    </div>

                    <div className="mt-8 text-center md:mt-16">
                        <a
                            href="#"
                            title=""
                            className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
                        >
                            {' '}
                            Check all 2,157 reviews{' '}
                        </a>
                    </div>

                    <div className="relative mt-10 md:mt-24">
                        <div
                            className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6"
                            style={{
                                background:
                                    'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                                borderRadius: '1.5rem',
                                filter: 'blur(20px)',
                                opacity: 0.3,
                            }}
                        ></div>

                        <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
                            <div className="flex flex-col overflow-hidden shadow-xl">
                                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                    <div className="flex-1">
                                        <blockquote className="flex-1 mt-8">
                                            <p className="text-lg leading-relaxed text-gray-900 font-pj">
                                                “You made it so simple. My new site is so much faster and easier to work
                                                with than my old site. I just choose the page, make the change.”
                                            </p>
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <img
                                            className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                            src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
                                            alt=""
                                        />
                                        <div className="ml-4">
                                            <p className="text-base font-bold text-gray-900 font-pj">
                                                Leslie Alexander
                                            </p>
                                            <p className="mt-0.5 text-sm font-pj text-gray-600">Tourist, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col overflow-hidden shadow-xl">
                                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                    <div className="flex-1">
                                        <blockquote className="flex-1 mt-8">
                                            <p className="text-lg leading-relaxed text-gray-900 font-pj">
                                                “Simply the best. Better than all the rest. I’d recommend this product
                                                to beginners and advanced users.”
                                            </p>
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <img
                                            className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                            src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
                                            alt=""
                                        />
                                        <div className="ml-4">
                                            <p className="text-base font-bold text-gray-900 font-pj">Jacob Jones</p>
                                            <p className="mt-0.5 text-sm font-pj text-gray-600">Local , New York</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col overflow-hidden shadow-xl">
                                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                    <div className="flex-1">
                                        <blockquote className="flex-1 mt-8">
                                            <p className="text-lg leading-relaxed text-gray-900 font-pj">
                                                “I just wanted to share a quick note and let you know that you guys do a
                                                really good job. I’m glad I decided to work with you.”
                                            </p>
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <img
                                            className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                            src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female-1.png"
                                            alt=""
                                        />
                                        <div className="ml-4">
                                            <p className="text-base font-bold text-gray-900 font-pj">Jenny Wilson</p>
                                            <p className="mt-0.5 text-sm font-pj text-gray-600">Tourist, New York</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingSection9;
