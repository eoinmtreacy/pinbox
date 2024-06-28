import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Clock from '../Images/clock.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';
import PropTypes from 'prop-types';

//Card swiping feature
const onSwipe = (direction, name, setCurrentIndex) => {
    let action;
    switch (direction) {
        case 'left':
            action = 'Hate it';
            break;
        case 'right':
            action = 'Interested';
            break;
        case 'up':
            action = 'Love it';
            break;
        case 'down':
            action = "Don't care";
            break;
        default:
            action = '';
            break;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
};

const onCardLeftScreen = (myIdentifier, direction) => {
    let action;
    switch (direction) {
        case 'left':
            action = 'Hate it';
            break;
        case 'right':
            action = 'Interested';
            break;
        case 'up':
            action = 'Love it';
            break;
        case 'down':
            action = "Don't care";
            break;
        default:
            action = '';
            break;
    }
    console.log(`${myIdentifier} left the screen to the ${direction} (${action})`);
};

// temp filter so you only see cards for places that have photos 
async function filterForPhotos(data) {
    const filePaths = await fetch('file_paths.json').then((response) => response.json())
    return await data.filter(place => filePaths.includes(place.photo_0 + ".png"))
}

function Preference() {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/app/get-places')
            .then((response) => response.json())
            .then(async (data) => {
                const filteredPlaces = await filterForPhotos(data)
                setCards(filteredPlaces)
            })}
    , []);


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="relative w-full mb-5">
                <select className="absolute top-0 right-0 bg-blue-500 text-white p-2 rounded-md">
                    <option value="all">All</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="bar">Bar</option>
                    <option value="cafe">Cafe</option>
                    <option value="cinema">Cinema</option>
                    <option value="iceCream">IceCream</option>
                </select>
            </div>
            <div className="text-4xl font-bold tracking-tight text-center text-black mb-5">Smart Recommendation</div>
            <div className="flex flex-col items-center p-5">
                {cards.length > 0 && currentIndex < cards.length && (
                    <TinderCard
                        key={cards[currentIndex].name}
                        onSwipe={(dir) => onSwipe(dir, cards[currentIndex].name, setCurrentIndex)}
                        onCardLeftScreen={(dir) => onCardLeftScreen(cards[currentIndex].name, dir)}
                        preventSwipe={['none']} // 변경 부분
                    >
                        <div className="flex flex-col bg-white rounded-xl border border-solid border-stone-400 max-w-lg p-5">
                            <img
                                src={cards[currentIndex].photo_0 + ".png"}
                                alt={cards[currentIndex].name}
                                className="max-w-full h-auto rounded-lg"
                            />
                            <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-40px] w-full text-white">
                                <div className="text-2xl font-bold">{cards[currentIndex].name}</div>
                                <div className="text-lg">{cards[currentIndex].subtype.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</div>
                                <div className="text-base">{cards[currentIndex].address}</div>
                            </div>
                            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                                <img src={Clock} className="w-12" alt="Clock" />
                                <div className="flex-auto my-auto">{cards[currentIndex].opening_Hours}</div>
                            </div>
                            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cd84b25e3fffef0b5991cd70a6ef4fe5555c08a1a67a9cf3dac60311c18b4af?"
                                    className="w-14"
                                    alt="Social Media"
                                />
                                <div className="flex-auto my-auto"><a href={cards[currentIndex].website}>{cards[currentIndex].website}</a></div>
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
                )}
            </div>
        </div>
    );
}

export default Preference;
