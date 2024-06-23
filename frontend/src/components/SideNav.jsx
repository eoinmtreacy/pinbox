import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';
import settings from '../Images/settings.png';
import home from '../Images/home.png';
import like from '../Images/like.png';
import friends from '../Images/friends.png';
import search from '../Images/search.png';

export const SideNav = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className="w-[70px] h-full bg-[#4665F5] fixed left-0 top-0 flex flex-col justify-around items-center pt-4 pb-4">
            <img className="w-10 h-10 mb-4" alt="Logo" src={logo} />
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/home')}>
                <img className="w-6 h-6 mb-1" alt="Home Icon" src={home} />
            </button>
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/search')}>
                <img className="w-6 h-6 mb-1" alt="Search Icon" src={search} />
            </button>
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/like')}>
                <img className="w-6 h-6 mb-1" alt="Like Icon" src={like} />
            </button>
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/friends')}>
                <img className="w-6 h-6 mb-1" alt="Friends Icon" src={friends} />
            </button>
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/settings')}>
                <img className="w-6 h-6 mb-1" alt="Settings Icon" src={settings} />
            </button>
        </div>
    );
};

export default SideNav;