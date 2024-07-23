import React from "react";

const DistanceSlider = ({ distance, setDistance }) => {
    return (
        <div className="flex flex-col items-center mx-2">
            <input
                type="range"
                min="0"
                max="1000"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full p-2"
            />
            <div className="flex justify-between w-full text-xs text-gray-700">
                <span>0m</span>
                <span>1000m</span>
            </div>
        </div>
    )
}

export default DistanceSlider;