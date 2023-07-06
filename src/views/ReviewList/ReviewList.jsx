/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getAllReviews, deleteReview, updateReview } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FaPencilAlt } from 'react-icons/fa';

import styles from './ReviewList.module.css';

const ReviewList = ({ artworkId, loggedUserId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [editedReview, setEditedReview] = useState('');
  const [errors, setErrors] = useState({});

  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  const handleRatingChange = (value) => {
    setRating(value);
    setErrors((prevErrors) => ({ ...prevErrors, rating: '' }));
  };

  const handleReviewChange = (e) => {
    const value = e.target.value;
    if (value.length <= 150) {
      setEditedReview(value);
      setErrors((prevErrors) => ({ ...prevErrors, review: '' }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        review: 'Review must be 150 characters or less',
      }));
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
    setShowOptions(true);
  };

  // console.log(editedReview);
  // console.log(rating);

  const handleSave = () => {
    const updatedReview = {
      ...review,
      review: {
        rating: rating,
        review: editedReview,
      },
    };

    dispatch(updateReview(artworkId, updatedReview))
      .then(() => {
        setIsEditing(false);
        window.alert('Review updated successfully');
        dispatch(getAllReviews(artworkId));
      })
      .catch((error) => {
        console.error(error);
        // Manejo de errores en caso de fallar la actualización de la review
      });
  };

  const handleCancel = () => {
    // Lógica para cancelar la edición y restaurar los valores originales
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Lógica para eliminar la review
    dispatch(deleteReview(artworkId)).then(() => {
      window.alert('Review deleted successfully');
      dispatch(getAllReviews(artworkId));
      setIsEditing(false);
    });
  };

  useEffect(() => {
    dispatch(getAllReviews(artworkId));
  }, [dispatch, artworkId]);

  return (
    <div className={styles.container}>
      {reviews?.map((reviewGroup, index) => (
        <div key={index}>
          {reviewGroup?.reviews?.map((review, reviewIndex) => (
            <div className={styles.commentContainer} key={reviewIndex}>
              {review.userId === loggedUserId ? (
                <>
                  {isEditing ? (
                    <>
                      <div className={styles.buttons}>
                        <button className={styles.updateButtonSave} onClick={handleSave}>
                          Save
                        </button>
                        <button className={styles.updateButtonCancel} onClick={handleCancel}>
                          Cancel
                        </button>
                        <button className={styles.deleteButton} onClick={handleDelete}>
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <button className={styles.editButton} onClick={handleUpdate}>
                      <FaPencilAlt className={styles.updateIcon} />
                    </button>
                  )}
                  {/* {isEditing ? (
                    <>
                      <div className={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button key={value} className={`${styles.ratingStar} ${value <= rating ? styles.ratingStarActive : ''}`} onClick={() => handleRatingChange(value)}>
                            ★
                          </button>
                        ))}
                      </div>
                      <h4 className={styles.name}>{review.userName}</h4>
                      <p className={styles.date}>{review.date}</p>
                      <div className={styles.formGroup}>
                        <textarea className={styles.textarea} id='review' placeholder='Add a comment...' rows='2' value={editedReview} onChange={handleReviewChange}></textarea>
                      </div>
                    </>
                  ) : ( */}
                  <>
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
                  </>
                  {/* )} */}
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
