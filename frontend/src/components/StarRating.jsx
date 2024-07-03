// src/components/StarRating.jsx
import React from 'react';
import PropTypes from 'prop-types';

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

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default StarRating;
