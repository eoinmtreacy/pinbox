import React from 'react';
import Restaurant from '../Images/restaurant.png';
import Cafe from '../Images/cafe.png';
import Pub from '../Images/pub.png';
import Park from '../Images/park.png';
import Mall from '../Images/mall.png';
const SearchBar = () => {
    return (
        <div>
            <div className="w-12 h-[237px] top-0 left-0 bg-[#d9d9d999] rounded-[20px]">
                <div className="top-[191px] left-[9px] absolute w-[35px] h-[35px] bg-white rounded-[17.5px]">
                    <img className="!absolute !w-[25px] !h-[26px] !top-[5px] !left-[5px]" src={Mall} alt="mall" />
                </div>
                <div className="top-[59px] left-2 absolute w-[35px] h-[35px] bg-white rounded-[17.5px]">
                    <img className="!absolute !w-[25px] !h-[26px] !top-[5px] !left-[5px]" src={Cafe} alt="cafe" />
                </div>
                <div className="top-[149px] left-2.5 absolute w-[35px] h-[35px] bg-white rounded-[17.5px]">
                    <img className="!absolute !w-[25px] !h-[26px] !top-[5px] !left-[5px]" src={Park} alt="park" />
                </div>
                <div className="top-[107px] left-[9px] absolute w-[35px] h-[35px] bg-white rounded-[17.5px]">
                    <img className="!absolute !w-[25px] !h-[26px] !top-[5px] !left-[5px]" src={Pub} alt="Pub" />
                </div>
                <div className="top-[11px] left-2 absolute w-[35px] h-[35px] bg-white rounded-[17.5px]">
                    <img
                        className="!absolute !w-[25px] !h-[26px] !top-[5px] !left-[5px]"
                        src={Restaurant}
                        alt="restaurant"
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
