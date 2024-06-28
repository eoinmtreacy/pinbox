import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import SamplePhoto from '../Images/preferenceSample.png';
import JoePizza from '../Images/joepizza.png';
import DeadRabbit from '../Images/deadrabbit.png';
import Grumpy from '../Images/grumpy.png';
import LeBernardin from '../Images/lebernardin.png';
import Phone from '../Images/phone.png';
import Money from '../Images/money.png';
import Clock from '../Images/clock.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const getColorForPreference = (preference) => {
    switch (preference) {
        case 'hate it':
            return 'red';
        case "don't care":
            return 'pink';
        case 'interested':
            return 'blue';
        case 'love it':
            return 'green';
        default:
            return 'black';
    }
};

const updatePreference = (name, newPreference, cards, setCards, mapInstance) => {
    const updatedCards = cards.map((place) => {
        if (place.name === name) {
            axios
                .post('http://localhost:5001/update-preference', { name, preference: newPreference })
                .then((response) => {
                    console.log('Preference updated in preference_sample_pin_data:', response.data);
                })
                .catch((error) => {
                    console.error('Error updating preference in preference_sample_pin_data:', error);
                });

            axios
                .post('http://localhost:5001/update-preference-data', { name, preference: newPreference })
                .then((response) => {
                    console.log('Preference updated in preference_sample_data:', response.data);
                })
                .catch((error) => {
                    console.error('Error updating preference in preference_sample_data:', error);
                });

            if (place.lat && place.lon && mapInstance) {
                const color = getColorForPreference(newPreference);
                const icon = L.divIcon({
                    className: 'custom-icon',
                    html: `<i class="fa fa-map-marker" style="color:${color}; font-size: 24px;"></i>`,
                });

                L.marker([place.lat, place.lon], { icon }).addTo(mapInstance);
            }

            return { ...place, preference: newPreference };
        }
        return place;
    });
    setCards(updatedCards);
};

const onSwipe = (direction, name, cards, setCards, setCurrentIndex, mapInstance) => {
    let newPreference;
    switch (direction) {
        case 'left':
            newPreference = 'hate it';
            break;
        case 'right':
            newPreference = 'love it';
            break;
        case 'up':
            newPreference = 'interested';
            break;
        case 'down':
            newPreference = "don't care";
            break;
        default:
            newPreference = '';
            break;
    }
    if (newPreference) {
        updatePreference(name, newPreference, cards, setCards, mapInstance);
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
};

const onCardLeftScreen = (myIdentifier, direction) => {
    console.log(`${myIdentifier} left the screen to the ${direction}`);
};

const StarRating = ({ rating }) => {
    const MAX_STARS = 5;
    const fullStar = '★';
    const emptyStar = '☆';

    return (
        <div className="flex">
            {Array.from({ length: MAX_STARS }, (_, index) => (
                <span key={index} className="text-yellow-500 text-2xl">
                    {index < rating ? fullStar : emptyStar}
                </span>
            ))}
        </div>
    );
};

function Preference({ mapInstance }) {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('/preference_sample_data.json')
            .then((response) => response.json())
            .then((data) => {
                const defaultCards = data.filter((card) => card.preference === 'default');
                const cardsWithImages = defaultCards.map((card) => {
                    switch (card.name) {
                        case "Joe's Pizza":
                            return { ...card, image: JoePizza };
                        case 'The Dead Rabbit':
                            return { ...card, image: DeadRabbit };
                        case 'Café Grumpy':
                            return { ...card, image: Grumpy };
                        case 'Le Bernardin':
                            return { ...card, image: LeBernardin };
                        default:
                            return { ...card, image: SamplePhoto };
                    }
                });
                setCards(cardsWithImages);
            })
            .catch((error) => {
                console.error('Error fetching the data:', error);
            });
    }, []);

    const handleButtonClick = (preference) => {
        if (currentIndex < cards.length) {
            updatePreference(cards[currentIndex].name, preference, cards, setCards, mapInstance);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

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
                        onSwipe={(dir) =>
                            onSwipe(dir, cards[currentIndex].name, cards, setCards, setCurrentIndex, mapInstance)
                        }
                        onCardLeftScreen={(dir) => onCardLeftScreen(cards[currentIndex].name, dir)}
                        preventSwipe={['none']}
                    >
                        <div className="flex flex-col bg-white rounded-xl border border-solid border-stone-400 max-w-lg p-5">
                            <img
                                src={cards[currentIndex].image}
                                alt={cards[currentIndex].name}
                                className="max-w-full h-auto rounded-lg"
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
                            <div className="self-center mt-5 w-full max-w-md">
                                <div className="flex gap-5 flex-wrap justify-center">
                                    <button onClick={() => handleButtonClick('hate it')}>
                                        <img src={Flag} className="mx-auto rounded-full h-24 w-24" alt="Hate it" />
                                    </button>
                                    <button onClick={() => handleButtonClick("don't care")}>
                                        <img
                                            src={DonotCare}
                                            className="mx-auto rounded-full h-24 w-24"
                                            alt="Don't care"
                                        />
                                    </button>
                                    <button onClick={() => handleButtonClick('interested')}>
                                        <img src={OkSign} className="mx-auto rounded-full h-24 w-24" alt="interested" />
                                    </button>
                                    <button onClick={() => handleButtonClick('love it')}>
                                        <img src={Heart} className="mx-auto rounded-full h-24 w-24" alt="Love it" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TinderCard>
                )}
            </div>
        </div>
    );
}

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default Preference;
