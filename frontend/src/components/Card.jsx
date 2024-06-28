import React from 'react';
import TinderCard from 'react-tinder-card';
import Clock from '../Images/clock.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';
import PropTypes from 'prop-types';

const Card = ({ place, onSwipe, onCardLeftScreen }) => {
    return (
        <TinderCard
            key={place.name}
            onSwipe={(dir) => onSwipe(dir, place.name)}
            onCardLeftScreen={(dir) => onCardLeftScreen(place.name, dir)}
            preventSwipe={['none']}
        >
            <div className="flex flex-col bg-white rounded-xl border border-solid border-stone-400 max-w-lg p-5 mx-auto shadow-lg">
                <img
                    src={place.photo_0 + ".png"}
                    alt={place.name}
                    className="w-full h-auto rounded-lg object-cover"
                />
                <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-40px] w-full text-white">
                    <div className="text-2xl font-bold">{place.name}</div>
                    <div className="text-lg">{place.subtype.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</div>
                    <div className="text-base">{place.address}</div>
                </div>
                <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                    <img src={Clock} className="w-12" alt="Clock" />
                    <div className="flex-auto my-auto">{place.opening_Hours}</div>
                </div>
                <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cd84b25e3fffef0b5991cd70a6ef4fe5555c08a1a67a9cf3dac60311c18b4af?"
                        className="w-14"
                        alt="Social Media"
                    />
                    <div className="flex-auto my-auto"><a href={place.website}>{place.website}</a></div>
                </div>
                <div className="self-center mt-5 w-full max-w-md">
                    <div className="flex gap-5 flex-wrap justify-center">
                        <img src={Flag} className="mx-auto rounded-full h-24 w-24" alt="Hate it" />
                        <img src={DonotCare} className="mx-auto rounded-full h-24 w-24" alt="Don't care" />
                        <img src={OkSign} className="mx-auto rounded-full h-24 w-24" alt="Wanna" />
                        <img src={Heart} className="mx-auto rounded-full h-24 w-24" alt="Love it" />
                    </div>
                </div>
            </div>
        </TinderCard>
    );
};

Card.propTypes = {
    place: PropTypes.object.isRequired,
    onSwipe: PropTypes.func.isRequired,
    onCardLeftScreen: PropTypes.func.isRequired
};

export default Card;
