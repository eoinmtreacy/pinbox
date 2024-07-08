import React from 'react';
import Signup from '../Signup';
import Landing2 from '../../Images/Landing2.png';

const LandingSocialFeature = () => {
    return (
        <section id="landing-section-5" className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
            <div className="mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className=" text-center text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-zinc-900 mb-8 uppercase">
                        Discover Your Friends' Favourite Places!
                    </div>

                    <div className="mt-11 mb-7 t-6 text-lg sm:text-2xl tracking-tighter text-black max-w-[800px] w-full mx-auto">
                        Visit and interact with your friends' pinboxes. Explore and collaborate on places saved in your
                        friends' pinboxes! Explore your friends' favourite and least favourite spots saved in their
                        pinboxes. You can also collaborate on spots your friends have created!
                    </div>
                    <div className="flex justify-center items-center">
                        <a
                            href="#"
                            title=""
                            onClick={Signup}
                            className="inline-flex items-center px-4 py-3 sm:px-6 sm:py-4 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full hover:bg-yellow-400 focus:bg-yellow-400"
                            role="button"
                        >
                            Join for free
                        </a>
                    </div>
                </div>

                <div className="flex overflow-hidden relative z-10 flex-col items-center self-stretch mt-7 text-base leading-7 min-h-[580px] lg:pb-10 lg:min-h-auto w-full rounded-2xl">
                    <img
                        loading="lazy"
                        src={Landing2}
                        className="object-cover w-full max-w-sm sm:max-w-md lg:max-w-3xl rounded-lg shadow-md"
                        alt="Friends' Favorite Places"
                    />
                </div>
            </div>
        </section>
    );
};

export default LandingSocialFeature;
