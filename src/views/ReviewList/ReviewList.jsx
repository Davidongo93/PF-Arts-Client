/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { getAllReviews } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ReviewList.module.css';

const ReviewList = ({ artworkId }) => {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  console.log(reviews);

  useEffect(() => {
    dispatch(getAllReviews(artworkId));
  }, [dispatch, artworkId]);

  return (
    <div className={styles.container}>
      {reviews?.map((reviewGroup, index) => (
        <div key={index}>
          {reviewGroup.reviews.map((review, reviewIndex) => (
            <div className={styles.commentContainer} key={reviewIndex}>
              <div className={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span key={value} className={`${styles.star} ${value <= review.review.rating ? styles.checked : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              <h4 className={styles.name}>{review.userName}</h4>
              <p className={styles.date}>{review.date}</p>
              <p className={styles.comment}>{review.review.review}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
