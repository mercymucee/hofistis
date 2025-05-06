import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ReviewPage = () => {
  const location = useLocation();
  const { state } = location || {};  // Destructure safely

  // Extract product details from state
  const { productId, productName, productDescription, productImage } = state || {};

  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [submittedReview, setSubmittedReview] = useState('');
  const [rating, setRating] = useState(0);  // State to hold rating value
  const [thankYouMessageVisible, setThankYouMessageVisible] = useState(false);  // State for the "Thank you" badge

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (ratingValue) => {
    setRating(ratingValue);  // Update the rating value when a star is clicked
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && rating > 0) {
      setSubmittedReview({
        text: reviewText,
        rating: rating,
      });  // Store both review text and rating
      setReviewText('');  // Clear the textarea after submission
      setRating(0);  // Reset rating
      setIsReviewFormVisible(false);  // Hide the form after submission

      // Show the thank you message after submission
      setThankYouMessageVisible(true);
      
      // Hide the "Thank you" message after 5 seconds
      setTimeout(() => {
        setThankYouMessageVisible(false);
      }, 5000);
    } else {
      alert('Please write a review and select a rating before submitting!');
    }
  };

  const handleShowReviewForm = () => {
    setIsReviewFormVisible(true);  // Show the review form when the button is clicked
  };

  return (
    <div className="container py-4">
      <h1 className="text-center" style={{ color: '#28a745' }}>Product Review</h1>

      <div className="card" style={{ borderRadius: '12px', padding: '20px' }}>
        <div className="text-center">
          
        </div>

        <h3 className="mt-3">{productName || 'Product Name'}</h3>
        <p>{productDescription || 'Product Description'}</p>

        {/* Button to show review form */}
        <button
          className="btn mt-3"
          style={{ backgroundColor: '#28a745', color: 'white' }}
          onClick={handleShowReviewForm}
        >
          Write a Review
        </button>

        {/* Review Form (Popup-style) */}
        {isReviewFormVisible && (
          <div className="mt-4">
            <h5>Your Review:</h5>
            <textarea
              value={reviewText}
              onChange={handleReviewChange}
              className="form-control"
              rows="5"
              style={{ resize: 'none' }}
              placeholder="Write your review here..."
            ></textarea>

            {/* Rating Section */}
            <div className="mt-3">
              <h5>Rating:</h5>
              <div style={{ fontSize: '1.5rem', color: '#ffc107' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      cursor: 'pointer',
                      color: star <= rating ? '#ffc107' : '#e4e5e9', // Highlight selected stars
                      transition: 'color 0.2s ease-in-out', // Smooth transition when clicking
                    }}
                    onClick={() => handleRatingChange(star)}  // Update rating when a star is clicked
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <button
              className="btn mt-3"
              style={{ backgroundColor: '#28a745', color: 'white' }}
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>
        )}

        {/* Display the submitted review below */}
        {submittedReview.text && (
          <div className="mt-4">
            <h5>Submitted Review:</h5>
            <p>{submittedReview.text}</p>
            <div>
              <h5>Rating:</h5>
              <div style={{ fontSize: '1.5rem', color: '#ffc107' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      color: star <= submittedReview.rating ? '#ffc107' : '#e4e5e9', // Highlight submitted stars
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Show the Thank You badge after review submission */}
        {thankYouMessageVisible && (
          <div className="mt-4">
            <span
              className="badge badge-success"
              style={{ fontSize: '1.2rem', backgroundColor: '#28a745', color: 'white' }}
            >
              Thank you for your review!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
