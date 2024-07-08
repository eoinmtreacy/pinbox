import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import Clock from '../Images/clock.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';
import Dropdown from './Dropdown';


function Preference({ places, pins, setPins }) {
    console.log(pins);
    const [card, setCard] = useState(places.pop());
    const [selectedSubtype, setSelectedSubtype] = useState('all');

    const handleSubtypeChange = (e) => {
        // setCurrentIndex(0); // Reset index to start from the beginning of the filtered list
    };

    const updatePreference = (dir) => {
        console.log(dir);
        let attitude
        switch (dir) {
            case 'left':
                attitude = 'hate it'
                break
            case 'right':
                attitude = 'love it'
                break
            case 'up':
                attitude = 'wanna'
                break
            case 'down':
                attitude = "don't care"
                break
            default:
                attitude = "don't care"
        }

        card.attitude = attitude

        setPins([...pins, card])

        // placeholder logic for database updating
        // fetch (/update-preference, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         user_id: user_id,
        //         place_id: card.place_id,
        //         attitude: attitude
        //     })

        setCard(places.pop())
    };

    return (
        <div className="preference-container flex flex-col items-center h-full bg-gray-100 p-4">
            <div className="relative w-full mb-5">
                <Dropdown selectedSubtype={selectedSubtype} handleSubtypeChange={handleSubtypeChange}/>
            </div>
            <div className="text-4xl font-bold tracking-tight text-center text-black mb-5">smart recommendation</div>

            <div className="flex flex-col items-center p-5 h-full overflow-auto">
                {places.length > 0 && (
                    <TinderCard
                        key={card.id}
                        onCardLeftScreen={(dir) => updatePreference(dir)}
                        preventswipe={['none']}
                        swipeRequirementType='position'
                        sqwipeThreshold={100}
                    >
                        <div className="flex flex-col bg-white rounded-xl border border-solid border-stone-400 max-w-sm p-5">
                            <img
                                src={card.photo_0 + '.png'}
                                alt={card.name}
                                className=" h-60 object-cover rounded-lg"
                            />
                            <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-40px] w-full text-white">
                                <div className="text-2xl font-bold">{card.name}</div>
                                <div className="text-lg">{card.subtype}</div>
                                <div className="text-base">{
                                    "" ? card.addr_Housenumber : card.addr_Housenumber + 
                                    "" ? card.addr_Street : card.addr_Street
                                }</div>
                            </div>

                            {card.opening_Hours && (
                            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                                <img src={Clock} className="w-12" alt="clock" />
                                <div className="flex-auto my-auto">{card.opening_Hours}</div>
                            </div> 
                            )}

                            {card.website && (
                            <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cd84b25e3fffef0b5991cd70a6ef4fe5555c08a1a67a9cf3dac60311c18b4af?"
                                    className="w-14"
                                    alt="social media"
                                />
                                <div className="flex-auto my-auto"><a href="{card.website}">{card.website}</a></div>
                            </div>
                            )}

                            <div className="self-center mt-5 w-full max-w-md">
                                <div className="flex flex-wrap justify-center">
                                    <img
                                        src={Flag}
                                        className="mx-auto rounded-full h-20 w-20 cursor-pointer"
                                        alt="hate it"
                                        onClick={() => updatePreference('left')}
                                    />
                                    <img
                                        src={DonotCare}
                                        className="mx-auto rounded-full h-20 w-20 cursor-pointer"
                                        alt="don't care"
                                        onClick={() => updatePreference("down")
                                        }
                                    />
                                    <img
                                        src={OkSign}
                                        className="mx-auto rounded-full h-20 w-20 cursor-pointer"
                                        alt="wanna"
                                        onClick={() => updatePreference('up')}
                                    />
                                    <img
                                        src={Heart}
                                        className="mx-auto rounded-full h-20 w-20 cursor-pointer"
                                        alt="love it"
                                        onClick={() => updatePreference('right')}
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
