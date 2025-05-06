// src/Rating.js
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Rating = ({ currentRating = 0, onRate }) => {
  const [hoveredRating, setHoveredRating] = useState(null);
  const [userRating, setUserRating] = useState(currentRating);

  const handleMouseOver = (rating) => {
    setHoveredRating(rating);
  };

  const handleMouseOut = () => {
    setHoveredRating(null);
  };

  const handleClick = (rating) => {
    setUserRating(rating);
    onRate(rating); // Send selected rating to parent
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = hoveredRating ? i <= hoveredRating : i <= userRating;
      stars.push(
        <span
          key={i}
          onMouseOver={() => handleMouseOver(i)}
          onMouseOut={handleMouseOut}
          onClick={() => handleClick(i)}
          style={{
            color: filled ? '#fbbf24' : '#e5e7eb',
            fontSize: '1.5rem',
            marginRight: '4px',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
        >
          {filled ? <FaStar /> : <FaRegStar />}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="rating d-flex">
      {renderStars()}
    </div>
  );
};

export default Rating;
