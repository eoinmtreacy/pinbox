
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import plus from "../../../Images/plus.png";
import { useAuthContext } from "../../../auth/AuthContext";

const NewCollectionButton = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuthContext();
    const { pinbox_id } = useParams();

    const addCollection = () => {
        if (isAuth) {
            const collection = prompt('Enter collection name');
            if (collection !== null) {
                // normalize collection name to be URL safe
                const normalizedCollection = collection.replace(/ /g, '-').toLowerCase();
                navigate(`/mainpage/${pinbox_id}/${normalizedCollection}`);
            }
        }
    };

    return (
        <>
            <button  onClick={addCollection}>
                <img className="w-6 h-6 mb-1" alt="Plus Icon" src={plus} />
                <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                    AddPinbox
                </span>
            </button>
        </>
    )
}

export default NewCollectionButton;