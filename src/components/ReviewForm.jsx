import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId }) => {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState('');

  // Handle review text change
  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  // Handle rating change
  const handleRatingChange = (star) => {
    setRating(star);
  };

  // Handle form submission
  const submitReview = async () => {
    if (!newReview || rating === 0) {
      setReviewMessage('Please provide a rating and a review before submitting.');
      return;
    }

    try {
      // Make a POST request to the backend to submit the review
      const response = await axios.post('https://your-backend-url.com/api/add_review', {
        productId,
        rating,
        comment: newReview,
      });

      if (response.status === 201) {
        setReviewMessage('Your review has been submitted successfully!');
        setNewReview('');
        setRating(0); // Reset the rating after submission
      }
    } catch (error) {
      setReviewMessage('There was an error submitting your review. Please try again later.');
    }
  };

  // Render the rating stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? '#ffc107' : '#e4e5e9',
          cursor: 'pointer',
        }}
        onClick={() => handleRatingChange(i + 1)}
      >
        ★
      </span>
    ));
  };

  return (
    <div>
      <h3>Write a Review</h3>
      {/* Text area for the review */}
      <textarea
        value={newReview}
        onChange={handleReviewChange}
        className="form-control"
        placeholder="Write your review..."
        rows="4"
      />
      
      {/* Render the stars for rating selection */}
      <div style={{ marginTop: '10px' }}>
        <span>Rating: </span>
        {renderStars(rating)}
      </div>
      
      {/* Submit button */}
      <button onClick={submitReview} className="btn btn-primary mt-2">
        Submit Review
      </button>

      {/* Display success or error message */}
      {reviewMessage && <p style={{ marginTop: '10px', color: '#fd7e14' }}>{reviewMessage}</p>}
    </div>
  );
};

export default ReviewForm;
