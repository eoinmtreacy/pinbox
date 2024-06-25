import React from 'react';

const TopNav = () => {
    return (
        <div className="fixed top-0 left-16 right-0 bg-gray-100 flex items-center justify-between px-4 shadow h-16 z-10">
            <div className="flex items-center space-x-8">
                <div className="flex flex-col items-center">
                    <span className="font-semibold">Time Stamp</span>
                    <input type="range" min="0" max="24" className="w-32" />
                    <div className="flex justify-between w-32 text-xs">
                        <span>Yesterday</span>
                        <span>Tomorrow</span>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold">Distance</span>
                    <input type="range" min="0" max="100" className="w-32" />
                    <div className="flex justify-between w-32 text-xs">
                        <span>500m</span>
                        <span>10km</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="showPins" name="showPins" className="h-5 w-5 rounded-full" />
                    <label htmlFor="showPins" className="text-gray-700 font-semibold">Show Pins</label>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Day</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Search Mode</button>
            </div>
        </div>
    );
};

export default TopNav;