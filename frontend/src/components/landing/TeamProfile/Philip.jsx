import React, { useState } from 'react';
import Philip from '../../../Images/TeamProfile/Philip.png';
import Tooltip from './Tooltip';

const PhilipProfile = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            className="relative flex flex-col justify-center items-center rounded-full border-white border-solid aspect-square bg-slate-200 border-4 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 transition-all duration-500 ease-in-out hover:bg-orange-500 hover:w-28 hover:h-28 sm:hover:w-36 sm:hover:h-36 md:hover:w-52 md:hover:h-52 lg:hover:w-70 lg:hover:h-70 xl:hover:w-80 xl:hover:h-80 focus:outline-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            aria-label="Philip Murphy profile"
        >
            <img
                loading="lazy"
                src={Philip}
                alt="Philip Murphy"
                className="rounded-full w-full h-full object-cover mr-5 -mb-4"
            />
            {hovered && <Tooltip name="Philip Murphy" role="FrontEnd Lead" />}
        </button>
    );
};

export default PhilipProfile;
