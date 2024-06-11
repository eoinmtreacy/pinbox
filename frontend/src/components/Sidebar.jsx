import React from 'react';
import Restaurant from '../Images/restaurant.png';
import Cafe from '../Images/cafe.png';
import Pub from '../Images/pub.png';
import Park from '../Images/park.png';
import Mall from '../Images/mall.png';

const SearchBar = () => {
    return (
        <div className="relative">
            <div className="w-12 h-[237px] bg-[#d9d9d999] rounded-[20px] flex flex-col items-center py-2">
                {/* Restaurant Icon */}
                <div className="mb-4 w-[35px] h-[35px] bg-white rounded-full flex items-center justify-center">
                    <img className="w-[25px] h-[26px]" src={Restaurant} alt="restaurant" />
                </div>
                {/* Cafe Icon */}
                <div className="mb-4 w-[35px] h-[35px] bg-white rounded-full flex items-center justify-center">
                    <img className="w-[25px] h-[26px]" src={Cafe} alt="cafe" />
                </div>
                {/* Pub Icon */}
                <div className="mb-4 w-[35px] h-[35px] bg-white rounded-full flex items-center justify-center">
                    <img className="w-[25px] h-[26px]" src={Pub} alt="Pub" />
                </div>
                {/* Park Icon */}
                <div className="mb-4 w-[35px] h-[35px] bg-white rounded-full flex items-center justify-center">
                    <img className="w-[25px] h-[26px]" src={Park} alt="park" />
                </div>
                {/* Mall Icon */}
                <div className="w-[35px] h-[35px] bg-white rounded-full flex items-center justify-center">
                    <img className="w-[25px] h-[26px]" src={Mall} alt="mall" />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;