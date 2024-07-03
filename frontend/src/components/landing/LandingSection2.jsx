import React from 'react';
import Service from '../../Images/service.png';

const LandingSection2 = () => {
    return (
        <section className="bg-[#FCF8F1] bg-opacity-30 py-12 sm:py-16 lg:py-20 h-screen flex items-center justify-center">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
                <div className="mt-20 text-7xl font-bold tracking-tighter leading-[86px] text-slate-900 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                    Build website fast
                </div>
                <div className="mt-11 text-2xl leading-10 w-[594px] max-md:mt-10 max-md:max-w-full">
                    Clarity gives you the blocks & components you need to create a truly professional website.
                </div>
                <div className="justify-center px-5 py-4 mt-8 text-lg font-semibold leading-7 text-white  rounded-lg">
                    Start using PinBox
                </div>
                <div className="flex overflow-hidden relative z-10 flex-col items-center self-stretch px-10 mt-7 text-base leading-7 min-h-[580px] pb-[594px] max-md:px-5 max-md:pb-10 max-md:max-w-full">
                    <img loading="lazy" src={Service} className="object-cover absolute inset-0 size-full" />
                    No credit card required Cancel anytime
                </div>
            </div>
        </section>
    );
};

export default LandingSection2;
