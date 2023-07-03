import styles from './ReviewList.module.css';

const ReviewList = ({ reviews }) => {
  return (
    <div className={styles.container}>
      {reviews.map((review, index) => (
        <div className={styles.commentContainer} key={index}>
          <div className={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`${styles.star} ${
                  value <= review.rating ? styles.checked : ''
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <h4 className={styles.name}>{review.name}</h4>
          <p className={styles.date}>{review.date}</p>
          <p className={styles.comment}>{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
