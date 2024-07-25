import React from "react";
import preferencesIcon from "../../../Images/like.png";

const ToggleFeedButton = ({ showFeed, setShowFeed }) => {
    return (
        <>
            <button onClick={() => setShowFeed(!showFeed)}>
                <img className="w-6 h-6 mb-1" alt="Like Icon" src={preferencesIcon} />
                <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                    Feed
                </span>

            </button>
        </>
    )
}

export default ToggleFeedButton;

