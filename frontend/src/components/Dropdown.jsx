import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ selectedSubtype, handleSubtypeChange }) => {
    return (
        <select
            className="absolute mb-7 top-0 right-0 bg-blue-500 text-white p-2 rounded-md"
            value={selectedSubtype}
            onChange={handleSubtypeChange}
        >
            <option value="all">All</option>
            <option value="restaurant">Restaurant</option>
            <option value="fast_food">Fast Food</option>
            <option value="cafe">Cafe</option>
            {/* <option value="bakery">Bakery</option> */}
            {/* <option value="park">Park</option> */}
        </select>
    );
};

Dropdown.propTypes = {
    selectedSubtype: PropTypes.string.isRequired,
    handleSubtypeChange: PropTypes.func.isRequired,
};

export default Dropdown;
