// src/components/landing/LandingSection6.jsx
import * as React from 'react';

function LandingSection7() {
    return (
        <section
            id="landing-section-7"
            className="flex flex-col justify-center items-center bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24"
        >
            <div className="flex flex-col justify-center items-center mt-10 w-full max-w-[1680px]">
                <div className="text-7xl font-black tracking-tighter text-zinc-900 max-md:text-4xl">
                    Business Owner Insights
                </div>
                <div className="mt-6 text-2xl text-center tracking-tighter text-black max-w-[800px] w-full">
                    Emphasizes the valuable insights PinBox offers to business owners about potential consumer interest.
                </div>
                <div className="flex flex-wrap justify-center content-start self-stretch mt-12 max-md:mt-10 w-full">
                    <div className="flex flex-wrap justify-center gap-5 w-full">
                        <div className="flex flex-col w-3/12 max-md:w-full">
                            <div className="flex flex-col grow justify-center p-6 w-full text-black rounded-xl bg-stone-50 max-w-[610px] max-md:px-5 max-md:mt-1">
                                <div className="text-4xl font-black tracking-tighter">
                                    Increase Traffic During Slow Periods
                                </div>
                                <div className="mt-3 text-2xl tracking-tighter">
                                    Boost business area's foot traffic by promoting it during quieter times. PinBox
                                    helps attract tourists and customers precisely when your business needs it most,
                                    ensuring a steady flow of patrons throughout the day.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-3/12 max-md:w-full">
                            <div className="flex flex-col grow justify-center p-6 w-full text-black rounded-xl bg-stone-50 max-w-[610px] max-md:px-5 max-md:mt-1">
                                <div className="text-4xl font-black tracking-tighter">Promote Hidden Gems</div>
                                <div className="mt-3 text-2xl tracking-tighter">
                                    Enhance visibility for lesser-known spots and make them more appealing to tourists.
                                    With PinBox, you can effectively advertise these unique locations, drawing attention
                                    away from crowded areas and giving your business a competitive edge.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-3/12 max-md:w-full">
                            <div className="flex flex-col grow justify-center p-6 w-full text-black rounded-xl bg-stone-50 max-w-[610px] max-md:px-5 max-md:mt-1">
                                <div className="text-4xl font-black tracking-tighter">Obtain Consumer Insights</div>
                                <div className="mt-3 text-2xl tracking-tighter">
                                    Gain a deeper understanding of what drives consumer interest with comprehensive
                                    metrics. PinBox provides valuable data on customer engagement and preferences,
                                    enabling you to tailor your offerings to meet the demands of your target audience
                                    and enhance your business strategy.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingSection7;
