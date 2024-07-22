import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { useAuthContext } from '../auth/AuthContext';
import axios from '../api/axios';
import calculateDistance from '../utils/calculateDistance';

import Clock from '../Images/clock.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';
import Dropdown from './Dropdown';
import Website from '../Images/website.png';

function Preference({ feed, pins, setPins, position, distance, priorityPin, setPriorityPin }) {
    const [ filteredFeed, setFilteredFeed ] = useState(feed);
    const [card, setCard] = useState(filteredFeed[filteredFeed.length - 1]);
    const [selectedSubtype, setSelectedSubtype] = useState('all');
    const { isAuth, user } = useAuthContext();
    const { collection } = useParams();

    useEffect(() => {
        const sortedFeed = filteredFeed.sort((a, b) => {
            const distanceA = calculateDistance(position.lat, position.lng, a.lat, a.lon);
            const distanceB = calculateDistance(position.lat, position.lng, b.lat, b.lon);
            return distanceB - distanceA;
        });
        const pinIds = pins.map((pin) => pin.place.id)	
        if (priorityPin !== null && !pinIds.includes(priorityPin.id)) sortedFeed.push(priorityPin)
        setCard(sortedFeed[sortedFeed.length - 1]);

    }, [filteredFeed, position, priorityPin]);

    const removeLastItem = () => {
        const newFilteredFeed = filteredFeed.slice(0, -1);
        setFilteredFeed(newFilteredFeed);
    };

    const handleSubtypeChange = (e) => {
        setSelectedSubtype(e.target.value);
        const pinIds = pins.map((pin) => pin.place.id);

        if (e.target.value === 'all') {
            setFilteredFeed(feed.filter((place) => !pinIds.includes(place.id)));
        } else {
            setFilteredFeed(feed.filter((place) => place.subtype === e.target.value && !pinIds.includes(place.id)));
        }
    }

    const capitalizeSubtype = (subtype) => {
        return subtype.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const updatePreference = async (dir) => {
        let attitude;
        switch (dir) {
            case 'left':
                attitude = 'hate_it';
                break;
            case 'right':
                attitude = 'love_it';
                break;
            case 'up':
                attitude = 'wanna';
                break;
            case 'down':
                attitude = 'dont_care';
                break;
            default:
                attitude = 'dont_care';
        }

        card.attitude = attitude;

        setPins([...pins, { place: card, attitude: attitude }]);

        if (!isAuth) {
            removeLastItem();
            return;
        }

        try {
            const response = await axios.post('/api/userlikes', {
                UserId: user,
                PlaceId: card.id,
                CategorySwipe: attitude,
                Type: card.subtype,
                Collection: collection,
                NormalizedCollection: collection ? collection.replace(/-/g, ' ').toUpperCase() : collection
            });

            if (response.status !== 201) {
                throw new Error('Failed to update preferences');
                throw new Error('Failed to update preferences');
            }

            removeLastItem();
            removeLastItem();
        } catch (error) {
            console.error(error);
            console.error(error);
        }
    };

    return (
        <div className="preference-container flex flex-col items-center h-full bg-blue-400 p-4">
            <div className="relative w-full mb-10">
                <Dropdown selectedSubtype={selectedSubtype} handleSubtypeChange={handleSubtypeChange} />
            </div>
            <div className="text-4xl font-bold tracking-tight text-center text-black mb-5">Suggested Recommendations</div>

            <div className="flex flex-col items-center p-5 h-full overflow-auto">
                {feed.length > 0 && (
                    <TinderCard
                        key={card.id}
                        onCardLeftScreen={(dir) => updatePreference(dir)}
                        preventSwipe={['none']}
                        swipeRequirementType='position'
                        swipeThreshold={100}
                    >
                        <div className="flex flex-col bg-white rounded-xl max-w-sm p-5">
                            <img
                                src={'/' + card.photo_0 + '.png'}
                                alt={card.name}
                                className="h-60 object-cover rounded-lg"
                            />
                            <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-40px] w-full text-white">
                                <div className="text-2xl font-bold">{card.name}</div>
                                <div className="text-lg">{capitalizeSubtype(card.subtype)}</div>
                                <div className="text-base">{`${card.addr_Housenumber || ''} ${card.addr_Street || ''}`}</div>
                            </div>

                            {card.opening_Hours && (
                                <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black">
                                    <img src={Clock} className="w-12" alt="clock" />
                                    <div className="flex-auto my-auto">
                                        <ul>
                                            {card.opening_Hours.split(';').map((day) => (
                                                <li key={day}>{day}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {card.website && (
                                <div className="flex gap-5 mt-1.5 text-m leading-7 text-black">
                                    <a
                                        href={card.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            loading="lazy"
                                            src={Website} // Use the imported website.png image
                                            className="w-14 cursor-pointer"
                                            alt="social media"
                                        />
                                    </a>
                                    <div className="flex-auto my-auto truncate">
                                        <a
                                            href={card.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Click here to visit
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="self-center mt-5 w-full max-w-md">
                                <div className="flex flex-wrap justify-center">
                                    <button
                                        className="mx-auto rounded-full h-20 w-20 cursor-[url('../Images/hateit.png'), auto] flex items-center justify-center"
                                        aria-label="hate it"
                                        title="I don't like this place"
                                        onClick={() => updatePreference('left')}
                                        onKeyDown={(e) => e.key === 'Enter' && updatePreference('left')}
                                    >
                                        <img src={Flag} alt="hate it" />
                                    </button>
                                    <button
                                        className="mx-auto rounded-full h-20 w-20 cursor-[url('../Images/dontcare.png'), auto] flex items-center justify-center"
                                        aria-label="don't care"
                                        title="don't show again"
                                        onClick={() => updatePreference("down")}
                                        onKeyDown={(e) => e.key === 'Enter' && updatePreference("down")}
                                    >
                                        <img src={DonotCare} alt="don't care" />
                                    </button>
                                    <button
                                        className="mx-auto rounded-full h-20 w-20 cursor-[url('../Images/wanna.png'), auto] flex items-center justify-center"
                                        aria-label="wanna"
                                        title="will revisit"
                                        onClick={() => updatePreference('up')}
                                        onKeyDown={(e) => e.key === 'Enter' && updatePreference('up')}
                                    >
                                        <img src={OkSign} alt="wanna" />
                                    </button>
                                    <button
                                        className="mx-auto rounded-full h-20 w-20 cursor-[url('../Images/loveit.png'), auto] flex items-center justify-center"
                                        aria-label="love it"
                                        title="add as a pin"
                                        onClick={() => updatePreference('right')}
                                        onKeyDown={(e) => e.key === 'Enter' && updatePreference('right')}
                                    >
                                        <img src={Heart} alt="love it" />
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

export default Preference;
