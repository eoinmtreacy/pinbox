import React from 'react';
import reviewPic1 from '../../Images/Review/reveiw1.png';
import reviewPic2 from '../../Images/Review/review2.png';
import reviewPic3 from '../../Images/Review/review3.png';
const LandingFeedback = () => {
    return (
        <section className="bg-[#FCF8F1] bg-opacity-30 h-full flex items-center justify-center px-4 lg:px-0 w-full overflow-x-hidden">
            <div className="mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-slate-900">
                            Your Feedback, Our Improvement
                        </div>
                        <div className="mt-2 text-lg sm:text-2xl tracking-tighter text-gray-700">
                            Creating Better Services Together
                        </div>
                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj"></h2>
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
                                                “PinBox helped me find hidden gems in the city and avoid crowded tourist
                                                spots. My trip to New York was so much more enjoyable thanks to their
                                                recommendations!”
                                            </p>
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <img
                                            className="w-12 h-12 rounded-full"
                                            src={reviewPic1}
                                            alt="Leslie Alexander"
                                        />
                                        <div className="ml-4">
                                            <div className="ml-4">
                                                <div className="text-lg font-medium text-gray-900">
                                                    Leslie Alexander
                                                </div>
                                                <div className="text-base text-gray-500">Tourist,Ireland</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col overflow-hidden shadow-xl">
                                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                    <div className="flex-1">
                                        <blockquote className="flex-1 mt-8">
                                            <p className="text-lg font-medium text-gray-900">
                                                “Using PinBox, I discovered new places in my neighborhood that I had
                                                never noticed before. It’s great to see my local area from a new
                                                perspective.”
                                            </p>
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <img className="w-12 h-12 rounded-full" src={reviewPic2} alt="Jacob Jones" />
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
                                            <p className="text-lg font-medium text-gray-900">
                                                “As a business owner, PinBox has been a game-changer. It’s helped me
                                                attract more customers by promoting my shop during off-peak hours. The
                                                insights are invaluable.”
                                            </p>
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <img className="w-12 h-12 rounded-full" src={reviewPic3} alt="Jenny Wilson" />
                                        <div className="ml-4">
                                            <p className="text-base font-bold text-gray-900 font-pj">Jenny Wilson</p>
                                            <p className="mt-0.5 text-sm font-pj text-gray-600">Business Owner</p>
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

export default LandingFeedback;
