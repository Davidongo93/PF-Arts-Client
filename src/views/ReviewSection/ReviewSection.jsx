/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview } from '../../redux/actions';
import ReviewList from '../ReviewList/ReviewList';
import styles from './ReviewSection.module.css';

const ReviewSection = ({ artworkId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRatingChange = (value) => {
    setRating(value);
    setErrors((prevErrors) => ({ ...prevErrors, rating: '' }));
  };

  const handleReviewChange = (e) => {
    const value = e.target.value;
    if (value.length <= 150) {
      setReview(value);
      setErrors((prevErrors) => ({ ...prevErrors, review: '' }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        review: 'Review must be 150 characters or less',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setErrors({ rating: 'Rating is required' });
      setSubmitted(true);
      return;
    }

    if (review.length === 0) {
      setErrors({ review: 'Please leave a comment' });
      setSubmitted(true);
      return;
    }

    const reviewData = {
      rating: rating,
      review: review,
    };

    dispatch(postReview(artworkId, reviewData));

    setSubmitted(false);
    setRating(0);
    setReview('');
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <div className={styles.separator}></div>
      <div className={styles.column}>
        <h4>Reviews</h4>
        <div className={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} className={`${styles.ratingStar} ${value <= rating ? styles.ratingStarActive : ''}`} onClick={() => handleRatingChange(value)}>
              ★
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <textarea className={styles.textarea} id='review' placeholder='Add a comment...' rows='2' value={review} onChange={handleReviewChange}></textarea>
          </div>
          {submitted && errors.rating && <p className={styles.error}>{errors.rating}</p>}
          {submitted && errors.review && <p className={styles.error}>{errors.review}</p>}
          <button type='submit' className={styles.submitButton}>
            Submit
          </button>
        </form>
        <ReviewList artworkId={artworkId} />
      </div>
    </div>
  );
};

export default ReviewSection;
