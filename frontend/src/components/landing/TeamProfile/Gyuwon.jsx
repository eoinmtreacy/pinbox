import React, { useState } from 'react';
import Gyuwon from '../../../Images/TeamProfile/Gyuwon.png';
import Tooltip from './Tooltip';

const GyuwonProfile = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative flex flex-col justify-center items-center rounded-full border-white border-solid aspect-square bg-slate-200 border-4 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 transition-all duration-500 ease-in-out hover:bg-orange-500 hover:w-28 hover:h-28 sm:hover:w-36 sm:hover:h-36 md:hover:w-52 md:hover:h-52 lg:hover:w-60 lg:hover:h-60 xl:hover:w-68 xl:hover:h-68"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img loading="lazy" src={Gyuwon} alt="Gyuwon Jung" className="rounded-full w-full h-full object-cover" />
            {hovered && <Tooltip name="Gyuwon Jung" role="Customer Lead" />}
        </div>
    );
};

export default GyuwonProfile;
