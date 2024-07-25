import React from "react";
import friendsIcon from "../../../Images/friends.png";

const ToggleFriendsButton = ({ showFriends, setShowFriends }) => {
    return (
        <>
            <button onClick={() => setShowFriends(!showFriends)}>
                <img className="w-6 h-6 mb-1" alt="Like Icon" src={friendsIcon} />
                <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                    Friends
                </span>

            </button>
        </>
    )
}

export default ToggleFriendsButton;

