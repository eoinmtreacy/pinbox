import React from 'react';
import Clock from '../Images/clock.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';
import useGetRecommendation from '../hooks/useGetRecommendation'; //anita recommendation

const PreferenceWithoutButtons = ({ name, image, type, address, hours, socialMedia, preference, placeId }) => {
    const { recommendationData, loading, error } = useGetRecommendation(placeId); //passing placeId from parent Map to the hook
    if (loading) return <div>Loading...</div>;

    const getPreferenceButton = (preference) => {
        switch (preference) {
            case 'hate_it':
                return <img src={Flag} className="mx-auto rounded-full h-24 w-24 cursor-pointer" alt="Hate it" />;
            case 'dont_care':
                return (
                    <img src={DonotCare} className="mx-auto rounded-full h-24 w-24 cursor-pointer" alt="Don't care" />
                );
            case 'wanna':
                return <img src={OkSign} className="mx-auto rounded-full h-24 w-24 cursor-pointer" alt="Wanna" />;
            case 'love_it':
                return <img src={Heart} className="mx-auto rounded-full h-24 w-24 cursor-pointer" alt="Love it" />;
            default:
                return null;
        }
    };

    const formatType = (type) => {
        return type
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const formatHours = (hours) => {
        if (!hours) {
            return 'Not Provided';
        }
        return hours.split(';').map((hour, index) => <div key={index}>{hour.trim()}</div>);
    };

    return (
        <div className="preference-container flex flex-col bg-white rounded-2xl p-4 items-center min-w-[160px] max-w-[213px] sm:min-w-[180px] sm:max-w-[240px] md:min-w-[200px] md:max-w-[266px] lg:min-w-[240px] lg:max-w-[300px] xl:min-w-[320px] xl:max-w-[320px]">
            <div className="flex flex-col justify-center items-center bg-white rounded-xl w-full p-5">
                <img
                    src={image ? '/' + image + '.png' : '/placeholder.png'}
                    alt={name}
                    className="w-48 h-64 object-cover rounded-lg"
                    style={{ minWidth: '192px', minHeight: '256px' }}
                />
            </div>

            <div className="text-center bg-black bg-opacity-50 p-3 rounded-lg mt-[-90px] w-full text-white flex flex-col justify-center items-center">
                <div className="text-xl font-bold">{name}</div>
                <div className="text-base">{formatType(type)}</div>
                <div className="text-base">{address}</div>
            </div>

            <div className="flex gap-5 mt-4 text-xl leading-7 text-black items-center w-full">
                <img src={Clock} className="w-12" alt="Clock" />
                <div className="flex-auto my-auto text-center whitespace-normal break-words">{formatHours(hours)}</div>
            </div>

            {recommendationData != null && ( //only shows this if we have recommendation data for this pin
                <div className="mt-3 text-center w-full">
                    {recommendationData?.numUsersLikers} other users also liked {recommendationData?.placeData.name}
                </div>
            )}

            {preference && (
                <div className="self-center mt-5 w-full max-w-md">
                    <div className="flex gap-5 flex-wrap justify-center">{getPreferenceButton(preference)}</div>
                </div>
            )}
        </div>
    );
};

export default PreferenceWithoutButtons;
