import React from "react";

const DistanceSlider = ({ distance, setDistance }) => {
    return (
        <div className="flex flex-col items-center mx-2">
             <input
                type="range"
                min="0"
                max="1000"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-16"
            />
  
        </div>
    )
}

export default DistanceSlider;