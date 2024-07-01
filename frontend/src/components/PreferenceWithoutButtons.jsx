import React from 'react';
import StarRating from './StarRating';
import Phone from '../Images/phone.png';
import Money from '../Images/money.png';
import Clock from '../Images/clock.png';
import SamplePhoto from '../Images/preferenceSample.png';
import JoePizza from '../Images/joepizza.png';
import DeadRabbit from '../Images/deadrabbit.png';
import Grumpy from '../Images/grumpy.png';
import LeBernadin from '../Images/lebernardin.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';

const imageMap = {
    "Joe's Pizza": JoePizza,
    'The Dead Rabbit': DeadRabbit,
    'Café Grumpy': Grumpy,
    'Le Bernardin': LeBernadin,
};

const PreferenceWithoutButtons = ({
    name,
    image,
    type,
    address,
    rating,
    phone,
    hours,
    price,
    socialMedia,
    preference,
}) => {
    const imageUrl = imageMap[name] || SamplePhoto;

    const getPreferenceButton = (preference) => {
        switch (preference) {
            case 'hate it':
                return <img src={Flag} className="mx-auto rounded-full h-24 w-24" alt="Hate it" />;
            case "don't care":
                return <img src={DonotCare} className="mx-auto rounded-full h-24 w-24" alt="Don't care" />;
            case 'interested':
                return <img src={OkSign} className="mx-auto rounded-full h-24 w-24" alt="Wanna" />;
            case 'love it':
                return <img src={Heart} className="mx-auto rounded-full h-24 w-24" alt="Love it" />;
            default:
                return null;
        }
    };

    return (
        <div className="preference-container flex flex-col bg-white rounded-2xl border border-solid border-stone-400 max-w-xs p-5">
            <div className="text-3xl font-bold  text-center text-black mb-1">Pin detail</div>
            <img src={imageUrl} alt={name} className="max-w-full w-60 h-80 object-cover rounded-lg" />
            <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-110px] w-60 h-30 text-white">
                <div className="text-xl font-bold">{name}</div>
                <div className="text-base">{type}</div>
                <div className="text-base">{address}</div>
            </div>
            <div className="flex gap-2 mt-7 text-xl leading-7 text-black">
                <StarRating rating={rating} />
                <div className="flex-auto text-base my-auto">See more reviews</div>
            </div>
            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap items-center">
                <img src={Phone} className="w-12" alt="Phone" />
                <div className="flex-auto my-auto text-left">{phone}</div>
            </div>
            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap items-center">
                <img src={Clock} className="w-12" alt="Clock" />
                <div className="flex-auto my-auto text-left">{hours}</div>
            </div>
            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap items-center">
                <img src={Money} className="w-12" alt="Money" />
                <div className="flex-auto my-auto text-left">{price}</div>
            </div>

            {preference && (
                <div className="self-center mt-5 w-full max-w-md">
                    <div className="flex gap-5 flex-wrap justify-center">{getPreferenceButton(preference)}</div>
                </div>
            )}
        </div>
    );
};

export default PreferenceWithoutButtons;
