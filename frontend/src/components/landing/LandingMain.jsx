import React from 'react';
import LandingHeader from './LandingHeader';
import Section1 from './LandingSection1';
import Section2 from './LandingSection2';
import Section3 from './LandingSection3';
import Section4 from './LandingSection4';

const LandingMain = () => {
    return (
        <div className="bg-white h-screen overflow-hidden">
            <LandingHeader />
            <div className="h-screen overflow-y-scroll snap-y snap-mandatory pt-16">
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
            </div>
        </div>
    );
};

export default LandingMain;
