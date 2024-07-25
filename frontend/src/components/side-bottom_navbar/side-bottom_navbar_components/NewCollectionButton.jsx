import React from "react";
import plus from "../../../Images/plus.png";

const NewCollectionButton = ({ showCollection, setShowCollection }) => {

    return (
        <>
            <button  onClick={() => setShowCollection(!showCollection)}>
                <img className="w-6 h-6 mb-1" alt="Plus Icon" src={plus} />
                <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                    AddPinbox
                </span>
            </button>
        </>
    )
}

export default NewCollectionButton;