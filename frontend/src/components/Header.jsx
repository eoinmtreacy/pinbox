import React from 'react';
import gyuwon from '../Images/gyuwon.png';
import map from '../Images/map.png';
import list from '../Images/list.png';
import '../App.css';
const Header = () => {
    return (
        <div className="flex gap-4 items-center p-4 ">
            <div className="flex w-[290px] h-[59px] items-center gap-5 px-7 py-0 relative bg-[rgb(89,87,166)] rounded-[30px] overflow-hidden border border-solid border-[#020202]">
                <span className="flex-grow text-center font-bold text-sm">Gyuwons PinBox</span>
                <div>
                    <img
                        className="w-14 h-12 rounded-full border border-solid border-[#020202] bg-[rgb(255,255,255)]"
                        src={gyuwon}
                        alt="Gyuwon"
                    />
                </div>
            </div>
            <div className="flex w-[149px] h-[57px] items-center gap-5 px-7 py-0 relative bg-[D9D9D9] rounded-[30px] overflow-hidden border border-solid border-[#020202]  bg-[rgb(255,255,255)]">
                <div className="flex items-center rounded-full  border border-solid border-[#020202]">
                    <img className="w-10 h-10 border-[#020202]" src={map} alt="Map" />
                </div>
                <img className="w-5 h-5 border-[#020202]" src={list} alt="List" />
            </div>
        </div>
    );
};

export default Header;
