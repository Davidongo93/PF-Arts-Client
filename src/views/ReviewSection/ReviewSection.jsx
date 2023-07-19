/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postReview, getAllReviews } from '../../redux/actions';
import ReviewList from '../ReviewList/ReviewList';
import styles from './ReviewSection.module.css';

const ReviewSection = ({ artworkId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const loggedUser = useSelector((state) => state.loggedUser);
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  const { userId } = loggedUser;

  const hasComment = reviews?.some((reviewGroup) => reviewGroup?.reviews?.some((r) => r.userId === userId));

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

    dispatch(postReview(artworkId, reviewData)).then(() => {
      dispatch(getAllReviews(artworkId));
    });

    setSubmitted(false);
    setRating(0);
    setReview('');
    setErrors({});
  };

  useEffect(() => {
    if (submitted && Object.keys(errors).length === 0) {
      // Realizar acciones adicionales después de enviar la revisión
      // Por ejemplo, restablecer los campos de entrada, mostrar un mensaje de éxito, etc.
      setRating(0);
      setReview('');
      setSubmitted(false);
    }
  }, [submitted, errors]);

  useEffect(() => {
    dispatch(getAllReviews(artworkId));
  }, [dispatch, artworkId]);

  return (
    <div className={styles.container}>
      <div className={styles.separator}></div>
      <div className={styles.column}>
        {!hasComment && (
          <>
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
          </>
        )}

        <ReviewList artworkId={artworkId} loggedUserId={userId} />
      </div>
    </div>
  );
};

export default ReviewSection;
