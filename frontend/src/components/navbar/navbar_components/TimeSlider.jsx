import React from "react";

const TimeSlider = ({ timeStamp, setTimeStamp }) => {
    return (
        <div className="flex flex-col items-center mx-2">
            <input
                type="range"
                min="0"
                max="23"
                value={timeStamp}
                onChange={(e) => setTimeStamp(e.target.value)}
                className="w-full p-2"
            />
            <div className="flex justify-between w-full text-xs text-gray-700">
                <span>0h</span>
                <span>24h</span>
            </div>
        </div>
    )
}

export default TimeSlider;