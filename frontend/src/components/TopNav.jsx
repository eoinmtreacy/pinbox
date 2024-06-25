import React from 'react';

const TopNav = () => {
    return (
        <div className="w-full h-16 bg-gray-200 flex items-center justify-between px-4 shadow">
            <div className="text-xl font-semibold">My Map Application</div>
            <div className="flex space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Day</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Search Mode</button>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="showPins" name="showPins" className="h-5 w-5" />
                    <label htmlFor="showPins" className="text-gray-700">Show Pins</label>
                </div>
            </div>
        </div>
    );
};

export default TopNav;