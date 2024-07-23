import React from "react";
import showPinsIcon from '../../../Images/pin.png';
import hidePinsIcon from '../../../Images/pin-x.png';

const ShowHidePins = ({ showPins, setShowPins }) => {
    return (
        <button
            onClick={() => setShowPins(!showPins)}
            aria-label={showPins ? "Hide Pins" : "Show Pins"}
        >
            <img src={showPins ? hidePinsIcon : showPinsIcon} alt="Pins Icon" className="w-8 h-8" />
        </button>
    )

}

export default ShowHidePins