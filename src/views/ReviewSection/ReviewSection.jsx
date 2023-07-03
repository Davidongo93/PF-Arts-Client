import { useState, useEffect } from 'react';
import ReviewList from '../ReviewList/ReviewList';
import styles from './ReviewSection.module.css';

const ReviewSection = ({ artworkId }) => {
  const [reviews, setReviews] = useState([]);
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
    addReview();
  };

  const handleReviewChange = (e) => {
    const value = e.target.value;
    if (value.length <= 150) {
      setReview(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.separator}></div>
        <h4>Reviews</h4>
        <div className={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`${styles.ratingStar} ${
                value <= rating ? styles.ratingStarActive : ''
              }`}
              onClick={() => handleRatingChange(value)}
            >
              ★
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type='text'
              className={styles.input}
              id='name'
              placeholder='Your Name*'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type='email'
              className={styles.input}
              id='email'
              placeholder='email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <textarea
              className={styles.textarea}
              id='review'
              placeholder='Review*'
              rows='2'
              value={review}
              onChange={handleReviewChange}
            ></textarea>
          </div>
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
