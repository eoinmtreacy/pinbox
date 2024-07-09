import React from 'react';

const Tooltip = ({ name, role }) => {
    return (
        <div className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 bg-white text-black rounded-lg shadow-lg p-3 text-center z-10 w-[200px] before:content-[''] before:absolute before:bottom-[-10px] before:left-1/2 before:transform before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-gray-500">{role}</div>
        </div>
    );
};

export default Tooltip;
