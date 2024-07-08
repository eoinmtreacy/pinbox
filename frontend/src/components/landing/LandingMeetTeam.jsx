import * as React from 'react';
import AidaProfile from './TeamProfile/Aida';
import GyuwonProfile from './TeamProfile/Gyuwon';
import DanProfile from './TeamProfile/Dan';
import EoinProfile from './TeamProfile/Eoin';
import PhilipProfile from './TeamProfile/Philip';
import AnitaProfile from './TeamProfile/Anita';
import Logo from '../../Images/logo.png';

function LandingMeetTeam() {
    return (
        <div id="landing-section-8" className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24 mt-6">
            <div className="flex flex-col items-center justify-center w-full max-w-7xl sm:px-6 lg:px-8">
                <div className=" text-center text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-zinc-900 uppercase">
                    Meet our team!
                </div>
                <div className="flex items-center justify-center my-4 teamlogo">
                    <img src={Logo} alt="PinBox Logo" className="w-16 h-16 sm:w-32 sm:h-32 lg:w-64 lg:h-64" />
                </div>
                <div className="text-center text-base sm:text-lg leading-6 sm:leading-8 text-zinc-600">
                    At PinBox, we harness <strong>the power of innovation</strong> and <strong>collaboration</strong> to
                    drive success.<br></br> Our passionate team of experts blends diverse skills with a unified love for
                    technology, <br></br>delivering unparalleled solutions tailored to our clients' needs. <br></br>
                    Every team member contributes unique insights and expertise,<br></br> ensuring we consistently
                    exceed industry standards and push the boundaries of what's possible.
                </div>
                <div className="flex flex-wrap justify-center space-x-2 lg:space-x-4 mt-4">
                    <AidaProfile />
                    <GyuwonProfile />
                    <DanProfile />
                    <EoinProfile />
                    <AnitaProfile />
                    <PhilipProfile />
                </div>
            </div>
        </div>
    );
}

export default LandingMeetTeam;
