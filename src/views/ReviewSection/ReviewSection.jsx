import { useState, useEffect } from 'react';
import ReviewList from '../ReviewList/ReviewList';
import styles from './ReviewSection.module.css';

const ReviewSection = ({ artworkId }) => {
  const [reviews, setReviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');

  useEffect(() => {
    // Cargar comentarios guardados desde el almacenamiento local al montar el componente
    const storedReviews = localStorage.getItem(`reviews_${artworkId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }

    // Obtener datos del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.userName);
      setEmail(user.email);
    }
  }, [artworkId]);

  useEffect(() => {
    // Guardar comentarios en el almacenamiento local cada vez que cambien
    localStorage.setItem(`reviews_${artworkId}`, JSON.stringify(reviews));
  }, [artworkId, reviews]);

  const addReview = () => {
    const newReview = {
      artworkId: artworkId,
      name: name,
      email: email,
      review: review,
      rating: rating,
      date: new Date().toLocaleDateString(),
    };
    setReviews([...reviews, newReview]);
    setName('');
    setEmail('');
    setReview('');
    setRating(0);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setErrors({
        rating: 'Rating is required',
      });
      setSubmitted(true);
      return;
    }

    addReview();
    setSubmitted(false);
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

  return (
    <div className={styles.container}>
      <div className={styles.separator}></div>
      <br />
      <br />
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
          {submitted && rating === 0 && <p className={styles.error}>Rating is required</p>}
          {errors.review && <p className={styles.error}>{errors.review}</p>}
          <button type='submit' className={styles.submitButton}>
            Submit
          </button>
        </form>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewSection;
