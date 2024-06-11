import React from 'react';

const SearchBar = () => {
    return (
        <div className="p-2 mt-8">
            {/* Input field for searching places */}
            <input
                type="text"
                placeholder="Search Places"
                className="w-full p-2 rounded-lg border border-solid border-gray-700"
            />
        </div>
    );
};

export default SearchBar;
