import React from 'react';
import Clock from '../Images/clock.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';
import useGetRecommendation from '../hooks/useGetRecommendation'; //anita recommendation 

const PreferenceWithoutButtons = ({
    name,
    image,
    type,
    address,
    hours,
    socialMedia,
    preference,
    placeId
}) => {

    const { recommendationData, loading, error } = useGetRecommendation(placeId); //passing placeId from parent Map to the hook
    if (loading) return <div>Loading...</div>;

    const getPreferenceButton = (preference) => {
        switch (preference) {
            case 'hate_it':
                return <img src={Flag} className="mx-auto rounded-full h-24 w-24 cursor-pointer" alt="Hate it" />;
            case "dont_care":
                return <img src={DonotCare} className="mx-auto rounded-full h-24 w-24 cursor-pointer" alt="Don't care" />;
            case 'wanna':
                return <img src={OkSign} className="mx-auto rounded-full h-24 w-24 cursor-pointer" alt="Wanna" />;
            case 'love_it':
                return <img src={Heart} className="mx-auto rounded-full h-24 w-24 cursor-pointer" alt="Love it" />;
            default:
                return null;
        }
    };

    const formatType = (type) => {
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="preference-container flex flex-col bg-white rounded-2xl max-w-xs p-5">

            <div className="text-3xl font-bold text-center text-black mb-1"></div>

            <img src={"/" + image + ".png"} alt={name} className="max-w-full w-60 h-80 object-cover rounded-lg" />

            <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-110px] w-60 h-30 text-white">
                <div className="text-xl font-bold">{name}</div>
                <div className="text-base">{formatType(type)}</div>
                <div className="text-base">{address}</div>
            </div>

            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap items-center">
                <img src={Clock} className="w-12" alt="Clock" />
                <div className="flex-auto my-auto text-center">{hours}</div>
            </div>

            {recommendationData != null && //only shows this if we have recommendation data for this pin
                        <div>{recommendationData?.numUsersLikers} other users also liked {recommendationData?.placeData.name}  </div>
            }

            {preference && (
                <div className="self-center mt-5 w-full max-w-md">
                    <div className="flex gap-5 flex-wrap justify-center">{getPreferenceButton(preference)}</div>
                </div>
            )}

        </div>
    );
};

export default PreferenceWithoutButtons;
