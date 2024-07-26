import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ selectedSubtype, handleSubtypeChange, feed }) => {
    const options = new Set();
    feed.forEach((pin) => {
        options.add(pin.subtype);
    });

    return (
        <select className="absolute top-0 right-0 bg-blue-500 text-white p-2 rounded-md" value={selectedSubtype} onChange={handleSubtypeChange}>
            <option value="all">All</option>
            {[...options].map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};

Dropdown.propTypes = {
    selectedSubtype: PropTypes.string.isRequired,
    handleSubtypeChange: PropTypes.func.isRequired
};

export default Dropdown;