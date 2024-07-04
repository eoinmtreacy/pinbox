import React from 'react';
import LandingHeader from './LandingHeader';
import LandingSection1 from './LandingSection1';
import LandingSection2 from './LandingSection2';
import LandingSection3 from './LandingSection3';
import LandingSection4 from './LandingSection4';

const LandingMain = () => {
    return (
        <div className="bg-white h-screen overflow-hidden">
            <LandingHeader />
            <div className="h-screen overflow-y-scroll snap-y snap-mandatory pt-16">
                <div className="snap-start h-screen">
                    <LandingSection1 />
                </div>
                <div className="snap-start h-screen">
                    <LandingSection2 />
                </div>
                <div className="snap-start h-screen">
                    <LandingSection3 />
                </div>
                <div className="snap-start h-screen">
                    <LandingSection4 />
                </div>
            </div>
        </div>
    );
};

export default LandingMain;
