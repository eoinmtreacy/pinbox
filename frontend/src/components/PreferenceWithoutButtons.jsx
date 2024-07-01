// src/components/PreferenceWithoutButtons.jsx
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

const imageMap = {
    "Joe's Pizza": JoePizza,
    'The Dead Rabbit': DeadRabbit,
    'Café Grumpy': Grumpy,
    'Le Bernardin': LeBernadin,
};

const PreferenceWithoutButtons = ({ name, image, type, address, rating, phone, hours, price, socialMedia }) => {
    const imageUrl = imageMap[name] || SamplePhoto;

    return (
        <div className="preference-container flex flex-col items-center bg-white rounded-xl border border-solid border-stone-400 max-w-xs p-5">
            <img src={imageUrl} alt={name} className="max-w-full w-40 h-40 object-cover rounded-lg" />
            <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-40px] w-80 text-white">
                <div className="text-xl font-bold">{name}</div>
                <div className="text-base">{type}</div>
                <div className="text-base">{address}</div>
            </div>
            <div className="flex gap-2 mt-6 text-xl leading-7 text-black">
                <StarRating rating={rating} />
                <div className="flex-auto text-base my-auto">See more reviews</div>
            </div>
            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                <img src={Phone} className="w-12" alt="Phone" />
                <div className="flex-auto my-auto">{phone}</div>
            </div>
            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                <img src={Clock} className="w-12" alt="Clock" />
                <div className="flex-auto my-auto">{hours}</div>
            </div>
            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                <img src={Money} className="w-12" alt="Money" />
                <div className="flex-auto my-auto">{price}</div>
            </div>
            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cd84b25e3fffef0b5991cd70a6ef4fe5555c08a1a67a9cf3dac60311c18b4af?"
                    className="w-14"
                    alt="Social Media"
                />
                <div className="flex-auto my-auto">{socialMedia}</div>
            </div>
        </div>
    );
};

export default PreferenceWithoutButtons;
