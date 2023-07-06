/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getAllReviews, deleteReview } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FaPencilAlt } from 'react-icons/fa';

import styles from './ReviewList.module.css';

const ReviewList = ({ artworkId, loggedUserId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    setIsEditing(true);
    setShowOptions(true);
  };

  const handleSave = () => {
    setIsEditing(false);
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
              {review.userId === loggedUserId && (
                <>
                  {isEditing ? (
                    <>
                      <div className={styles.buttons}>
                        <button
                          className={styles.updateButtonSave}
                          onClick={handleSave}
                        >
                          Save
                        </button>
                        <button
                          className={styles.updateButtonCancel}
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      className={styles.editButton}
                      onClick={handleUpdate}
                    >
                      <FaPencilAlt className={styles.updateIcon} />
                    </button>
                  )}
                </>
              )}
              <div className={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`${styles.star} ${
                      value <= review.review.rating ? styles.checked : ''
                    }`}
                  >
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
