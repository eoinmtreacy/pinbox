import React from 'react';
import TouristImage from '../../Images/tourist.png';
import BusinessOwnerImage from '../../Images/business-owner.png';

const LandingSection2 = () => {
    return (
        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
            <div className="mx-auto w-full max-w-7xl sm:px-6 lg:px-8 text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-zinc-900 mb-8 uppercase">
                    Target Customers
                </div>
                <div className="mt-6 text-lg sm:text-2xl tracking-tighter text-black max-w-[800px] w-full mx-auto">
                    Emphasizes the valuable insights PinBox offers to users about potential consumer interest.
                </div>
                <div className="flex flex-wrap justify-center content-start self-stretch mt-12 gap-6 w-full">
                    <div className="flex flex-col w-full lg:w-5/12 items-center">
                        <img
                            src={TouristImage}
                            alt="Tourist in New York"
                            className="w-full h-auto max-w-2xl rounded-lg shadow-md mb-6"
                        />
                        <div className="flex flex-col grow justify-start p-8 w-full text-black rounded-xl bg-white shadow-lg max-w-3xl">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter">
                                Tourist in NewYork
                            </div>
                            <div className="mt-3 text-lg sm:text-2xl tracking-tighter">
                                Helps tourists avoid overcrowded spots by recommending optimal visiting times to beat
                                the crowd.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full lg:w-5/12 items-center">
                        <img
                            src={BusinessOwnerImage}
                            alt="Business Owner"
                            className="w-full h-auto max-w-2xl rounded-lg shadow-md mb-6"
                        />
                        <div className="flex flex-col grow justify-start p-8 w-full text-black rounded-xl bg-white shadow-lg max-w-3xl">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter">
                                Business Owners
                            </div>
                            <div className="mt-3 text-lg sm:text-2xl tracking-tighter">
                                Offers tailored suggestions based on user preferences, making planning easier and more
                                personal.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingSection2;
