import React from 'react';
import profileIcon from '../Images/profile.png';
export const BottomNav = () => {
    return (
        <div className="w-[40vh] h-[98px] bg-white ">
            <div className="absolute">
                <div className="absolute w-[76px] h-[49px] top-0 left-[3vh]">
                    <div className="absolute top-[34px] left-6 [font-family:'Inter',Helvetica] font-medium text-black text-[10px] text-center tracking-[-0.24px] leading-[normal] whitespace-nowrap">
                        Home
                    </div>
                    <div className="absolute w-6 h-6 top-[7px] left-[26px]">
                        <img
                            className="absolute w-5 h-[22px] top-px left-0.5"
                            alt="Subtract"
                            src="https://c.animaapp.com/0aBwylXj/img/subtract.svg"
                        />
                    </div>
                </div>
                <div className="left-[12vh] absolute w-[76px] h-[49px] top-0 opacity-50">
                    <div className="absolute top-[34px] left-[7px] [font-family:'Inter',Helvetica] font-medium text-black text-[10px] text-center tracking-[-0.24px] leading-[normal] whitespace-nowrap">
                        Browse Place
                    </div>
                    <img
                        className="absolute w-6 h-6 top-[7px] left-[26px]"
                        alt="Icon search"
                        src="https://c.animaapp.com/0aBwylXj/img/icon-search.svg"
                    />
                </div>
                <div className="left-[21vh] absolute w-[76px] h-[49px] top-0 opacity-50">
                    <div className="absolute top-[34px] left-1 [font-family:'Inter',Helvetica] font-medium text-black text-[10px] text-center tracking-[-0.24px] leading-[normal] whitespace-nowrap">
                        Friend’s PinBox
                    </div>
                    <img
                        className="absolute w-6 h-6 top-[7px] left-[26px]"
                        alt="Icon radio"
                        src="https://c.animaapp.com/0aBwylXj/img/icon-radio.svg"
                    />
                </div>
                <div className="left-[30vh] absolute w-[76px] h-[49px] top-0 opacity-50">
                    <div className="left-[] absolute w-[76px] h-[49px] top-0 opacity-50">
                        <div className="absolute top-[34px] left-[23px] [font-family:'Inter',Helvetica] font-medium text-black text-[10px] text-center tracking-[-0.24px] leading-[normal] whitespace-nowrap">
                            Profile
                        </div>
                        <img className="!absolute !w-6 !h-6 !top-2 !left-[26px]" src={profileIcon} alt="List" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BottomNav;
