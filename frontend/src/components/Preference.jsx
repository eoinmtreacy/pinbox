import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import SamplePhoto from '../Images/preferenceSample.png';
import JoePizza from '../Images/joepizza.png';
import DeadRabbit from '../Images/deadrabbit.png';
import Grumpy from '../Images/grumpy.png';
import LeBernadin from '../Images/lebernardin.png';
import Phone from '../Images/phone.png';
import Money from '../Images/money.png';
import Clock from '../Images/clock.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';
import StarRating from './StarRating';
import PropTypes from 'prop-types';

const updatePreference = async (name, action, setGeoJsonData) => {
    try {
        const response = await fetch('/preference_sample_data.geojson');
        if (!response.ok) {
            throw new Error('Failed to fetch GeoJSON data');
        }
        const geoJson = await response.json();

        const updatedFeatures = geoJson.features.map((feature) => {
            if (feature.properties.name === name) {
                feature.properties.preference = action.toLowerCase();
            }
            return feature;
        });

        geoJson.features = updatedFeatures;
        setGeoJsonData(geoJson);
        console.log('Preference updated successfully in geoJSON:', geoJson);
    } catch (error) {
        console.error('Error updating preference in geoJSON:', error);
    }
};

const onSwipe = async (direction, name, setCurrentIndex, setGeoJsonData) => {
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
    console.log(`${action} on ${name}`);
    await updatePreference(name, action, setGeoJsonData);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4); // Keeps index in bounds
    document.dispatchEvent(new CustomEvent('userPreferenceChanged', { detail: { name, action } }));
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

function Preference({ setGeoJsonData }) {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('/preference_sample_data.json')
            .then((response) => response.json())
            .then((data) => {
                const cardsWithImages = data.map((card) => {
                    switch (card.name) {
                        case "Joe's Pizza":
                            return { ...card, image: JoePizza };
                        case 'The Dead Rabbit':
                            return { ...card, image: DeadRabbit };
                        case 'Café Grumpy':
                            return { ...card, image: Grumpy };
                        case 'Le Bernardin':
                            return { ...card, image: LeBernadin };
                        default:
                            return { ...card, image: SamplePhoto };
                    }
                });
                setCards(cardsWithImages);
            });
    }, []);
    const handleButtonClick = async (action, name) => {
        let direction;
        switch (action) {
            case 'Hate it':
                direction = 'left';
                break;
            case 'Interested':
                direction = 'right';
                break;
            case 'Love it':
                direction = 'up';
                break;
            case "Don't care":
                direction = 'down';
                break;
            default:
                direction = '';
                break;
        }
        await onSwipe(direction, name, setCurrentIndex, setGeoJsonData);
    };
    return (
        <div className="preference-container flex flex-col items-center h-full bg-gray-100 p-4">
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
            <div className="flex flex-col items-center p-5 h-full overflow-auto">
                {cards.length > 0 && currentIndex < cards.length && (
                    <TinderCard
                        key={currentIndex}
                        onSwipe={(dir) => onSwipe(dir, cards[currentIndex].name, setCurrentIndex, setGeoJsonData)}
                        onCardLeftScreen={(dir) => onCardLeftScreen(cards[currentIndex].name, dir)}
                        preventSwipe={['none']}
                    >
                        <div className="flex flex-col bg-white rounded-xl border border-solid border-stone-400 max-w-l p-5">
                            <img
                                src={cards[currentIndex].image}
                                alt={cards[currentIndex].name}
                                className="max-w-full h-auto rounded-lg "
                            />
                            <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-40px] w-full text-white">
                                <div className="text-2xl font-bold">{cards[currentIndex].name}</div>
                                <div className="text-lg">{cards[currentIndex].type}</div>
                                <div className="text-base">{cards[currentIndex].address}</div>
                            </div>
                            <div className="flex gap-2 mt-6 text-xl leading-7 text-black">
                                <StarRating rating={cards[currentIndex].rating} />
                                <div className="flex-auto my-auto">See more reviews</div>
                            </div>
                            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                                <img src={Phone} className="w-12" alt="Phone" />
                                <div className="flex-auto my-auto">{cards[currentIndex].phone}</div>
                            </div>
                            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                                <img src={Clock} className="w-12" alt="Clock" />
                                <div className="flex-auto my-auto">{cards[currentIndex].hours}</div>
                            </div>
                            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                                <img src={Money} className="w-12" alt="Money" />
                                <div className="flex-auto my-auto">{cards[currentIndex].price}</div>
                            </div>
                            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cd84b25e3fffef0b5991cd70a6ef4fe5555c08a1a67a9cf3dac60311c18b4af?"
                                    className="w-14"
                                    alt="Social Media"
                                />
                                <div className="flex-auto my-auto">{cards[currentIndex].socialMedia}</div>
                            </div>
                            <div className="self-center mt-5 w-full max-w-md">
                                <div className="flex gap-5 flex-wrap justify-center">
                                    <img
                                        src={Flag}
                                        className="mx-auto rounded-full h-24 w-24"
                                        alt="Hate it"
                                        onClick={() => handleButtonClick('Hate it', cards[currentIndex].name)}
                                    />
                                    <img
                                        src={DonotCare}
                                        className="mx-auto rounded-full h-24 w-24"
                                        alt="Don't care"
                                        onClick={() => handleButtonClick("Don't care", cards[currentIndex].name)}
                                    />
                                    <img
                                        src={OkSign}
                                        className="mx-auto rounded-full h-24 w-24"
                                        alt="Wanna"
                                        onClick={() => handleButtonClick('Interested', cards[currentIndex].name)}
                                    />
                                    <img
                                        src={Heart}
                                        className="mx-auto rounded-full h-24 w-24"
                                        alt="Love it"
                                        onClick={() => handleButtonClick('Love it', cards[currentIndex].name)}
                                    />
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
