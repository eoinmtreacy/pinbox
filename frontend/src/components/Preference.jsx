import React, { useState, useEffect } from 'react';
import Card from './Card';
import Dropdown from './Dropdown';
import { fetchPlaces } from '../services/api';
import { filterForPhotos } from '../utils/filter';

const Preference = () => {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedSubtype, setSelectedSubtype] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            const places = await fetchPlaces();
            if (places.error) {
                console.error(places.message);
                setCards([]); // Example: setting cards to an empty array on error
                return; // Prevent further execution
            }
            const filteredPlaces = await filterForPhotos(places);
            setCards(filteredPlaces);
        };
        fetchData();
    }, []);

    const handleSubtypeChange = (e) => {
        setSelectedSubtype(e.target.value);
        setCurrentIndex(0); // Reset index to start from the beginning of the filtered list
    };

    const onSwipe = (direction, name) => {
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

    const filteredCards = selectedSubtype === 'all' ? cards : cards.filter(card => card.subtype === selectedSubtype);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="relative w-full mb-5">
                <Dropdown selectedSubtype={selectedSubtype} handleSubtypeChange={handleSubtypeChange} />
            </div>
            <div className="text-4xl font-bold tracking-tight text-center text-black mb-5">Smart Recommendation</div>
            <div className="flex flex-col items-center p-5">
                {filteredCards.length > 0 && currentIndex < filteredCards.length && (
                    <Card
                        place={filteredCards[currentIndex]}
                        onSwipe={onSwipe}
                        onCardLeftScreen={onCardLeftScreen}
                    />
                )}
            </div>
        </div>
    );
};

export default Preference;
