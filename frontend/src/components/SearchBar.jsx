import React, { useState, useContext } from 'react';
import useFetchPlaces from '../hooks/useFetchPlaces'

const SearchBar = ({ priorityPin, setPriorityPin }) => {
    const { feed } = useFetchPlaces();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter pins based on search term
    const filteredPins = feed.filter(pin => {
        const trimmedSearchTerm = searchTerm.trim().toLowerCase();
        if (trimmedSearchTerm === '') return false; // prevents all places showing before you start typing

        const matchesName = pin.name.toLowerCase().includes(trimmedSearchTerm);
        const matchesSubtype = pin.subtype.toLowerCase().includes(trimmedSearchTerm);

        return matchesName || matchesSubtype;
    });

    const onClick = (card) => { 
        setPriorityPin(card)
        console.log(card);
    }

    return (
        <div className="mt-4 relative">
            <input
                type="text"
                placeholder="Search"
                className="w-full p-2 rounded-full border border-solid border-[#020202]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <div className="absolute top-12 left-0 right-0 bg-white border border-solid border-[#020202] rounded-lg z-10">
                    {filteredPins.map(pin => (
                        <div key={pin.id} className="p-2 border-b border-solid border-[#020202]" onClick={x => onClick(pin)}>
                            <div className="font-bold">{pin.name}</div>
                            <div className="text-sm text-gray-500">{pin.subtype}</div>
                            <div className="text-sm text-gray-500">{pin.addr_Street}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
