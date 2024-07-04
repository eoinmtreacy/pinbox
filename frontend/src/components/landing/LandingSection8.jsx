import * as React from 'react';
import AidaProfile from './TeamProfile/Aida';
import GyuwonProfile from './TeamProfile/Gyuwon';
import DanProfile from './TeamProfile/Dan';
import EoinProfile from './TeamProfile/Eoin';
import PhilipProfile from './TeamProfile/Philip';
import AnitaProfile from './TeamProfile/Anita';
import Logo from '../../Images/logo.png';

function LandingSection8() {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-10 text-center min-h-screen max-md:px-5">
            <div className="flex flex-col mt-9 max-w-full w-full md:w-3/4 lg:w-1/2">
                <div className="self-center text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-gray-950">
                    Meet our team!
                </div>
                <div className="flex items-center justify-center my-4 teamlogo">
                    <img src={Logo} alt="PinBox Logo" className="w-32 h-32 md:w-64 md:h-64" />
                </div>
                <div className="mt-4 text-base md:text-lg leading-6 md:leading-8 text-zinc-600">
                    At PinBox, we harness <strong>the power of innovation</strong> and <strong>collaboration</strong> to
                    drive success. Our passionate team of experts blends diverse skills with a unified love for
                    technology, delivering unparalleled solutions tailored to our clients' needs. Every team member
                    contributes unique insights and expertise, ensuring we consistently exceed industry standards and
                    push the boundaries of what's possible.
                </div>
            </div>
            <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mt-12">
                <AidaProfile />
                <GyuwonProfile />
                <DanProfile />
                <EoinProfile />
                <AnitaProfile />
                <PhilipProfile />
            </div>
        </div>
    );
}

export default LandingSection8;
