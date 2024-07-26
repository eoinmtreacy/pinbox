import React, { useEffect, useState } from "react";
import Clock from "../Images/clock.png";
import Website from "../Images/website.png";
import useGetRecommendation from "../hooks/useGetRecommendation"; //anita recommendation

const Card = ({ place, attitude, setPriorityPin }) => {
    const { recommendationData, loading, error } = useGetRecommendation(place.id);
    const [ altPhoto, setAltPhoto ] = useState(false);

    const capitalizeSubtype = (subtype) => {
        return subtype
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        console.log(recommendationData);
    }, [recommendationData]);

    return (
        <div className="flex flex-col bg-white rounded-xl h-full max-w p-1">
            <img
                src={'/' + place.photo_0 + '.png'}
                alt={place.name}
                className="h-60 object-cover rounded-lg cursor-pointer"
                onClick={() => setAltPhoto(!altPhoto)}
            />
            <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-40px] w-full text-white">
                <div className="text-2xl font-bold">{place.name}</div>
                <div className="text-lg">{capitalizeSubtype(place.subtype)}</div>
                <div className="text-base">{`${place.addr_Housenumber || ''} ${place.addr_Street || ''
                    }`}</div>
            </div>

            {place.opening_Hours && (
                <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black">
                    <img src={Clock} className="w-12" alt="clock" />
                    <div className="flex-auto my-auto">
                        <ul>
                            {place.opening_Hours.split(';').map((day) => (
                                <li key={day}>{day}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {place.website && (
                <div className="flex gap-5 mt-1.5 text-m leading-7 text-black">
                    <a href={place.website} target="_blank" rel="noopener noreferrer">
                        <img
                            loading="lazy"
                            src={Website} // Use the imported website.png image
                            className="w-14 cursor-pointer"
                            alt="social media"
                        />
                    </a>
                    <div className="flex-auto my-auto truncate">
                        <a href={place.website} target="_blank" rel="noopener noreferrer">
                            Click here to visit
                        </a>
                    </div>
                </div>
            )}

            {recommendationData != null && ( 
                <div className="mt-3 text-center w-full">
                    {recommendationData?.numUsersLikers} other users also liked  
                    <a 
                        onClick={() => setPriorityPin(recommendationData.placeData)}>
                    {" " + recommendationData?.placeData.name}
                    </a>
                </div>
            )}
        </div>
    )
}

export default Card;