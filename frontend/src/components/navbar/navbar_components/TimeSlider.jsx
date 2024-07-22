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
                className="w-16"
            />
            <div className="flex justify-between w-16 text-xs text-gray-700">
                <span>0</span>
                <span>24</span>
            </div>
        </div>


    )
}

export default TimeSlider;