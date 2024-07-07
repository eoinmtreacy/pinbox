import React from 'react';
import LandingHeader from './LandingHeader';
import Section1 from './LandingSection1';
import Section2 from './LandingSection2';
import Section2_1 from './LandingSection2_1';
import Section3 from './LandingSection3';
import Section4 from './LandingSection4';
import Section5 from './LandingSection5';
import Section6 from './LandingSection6';
import Section7 from './LandingSection7';
import Section8 from './LandingSection8';
import Section8_1 from './LandingSection8_1';
import Section9 from './LandingSection9';

const LandingMain = () => {
    return (
        <div className="bg-white h-screen overflow-hidden">
            <div className="mb-5 w-full">
                <LandingHeader />
            </div>

            <div className="h-screen overflow-y-scroll snap-y snap-mandatory pt-3 w-full overflow-x-hidden">
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section1 />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section2 />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section2_1 />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section3 />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section4 />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section5 />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section6 />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section7 />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section8_1 />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section8 />
                </div>

                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Section9 />
                </div>
            </div>
        </div>
    );
};

export default LandingMain;
