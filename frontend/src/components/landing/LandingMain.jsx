import React from 'react';
import LandingHeader from './LandingHeader';
import Section1 from './LandingSection1';
import Section2 from './LandingSection2';
import Section3 from './LandingSection3';
import Section4 from './LandingSection4';
import Section5 from './LandingSection5';
import Section6 from './LandingSection6';
import Section7 from './LandingSection7';
import Section8 from './LandingSection8';
import Section9 from './LandingSection9';
const LandingMain = () => {
    return (
        <div className="bg-white h-screen overflow-hidden">
            <div className="mb-5">
                <LandingHeader className="" />
            </div>

            <div className="h-screen overflow-y-scroll snap-y snap-mandatory pt-3">
                <div className="snap-start h-screen">
                    <Section1 />
                </div>
                <div className="snap-start h-screen">
                    <Section2 />
                </div>
                <div className="snap-start h-screen">
                    <Section3 />
                </div>
                <div className="snap-start h-screen">
                    <Section4 />
                </div>
                <div className="snap-start h-screen">
                    <Section5 />
                </div>
                <div className="snap-start h-screen">
                    <Section6 />
                </div>
                <div className="snap-start h-screen">
                    <Section7 />
                </div>
                <div className="snap-start h-screen">
                    <Section8 />
                </div>
                <div className="snap-start h-screen">
                    <Section9 />
                </div>
            </div>
        </div>
    );
};

export default LandingMain;
