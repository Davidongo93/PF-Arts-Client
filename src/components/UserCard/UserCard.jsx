import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './UserCard.module.css';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user.userName);
  const [description, setDescription] = useState(user.description);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [location, setLocation] = useState(user.location);
  const [image, setImage] = useState(user.image);
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const validationErrors = validate({ userName });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const updatedUser = {
        ...user,
        userName: userName,
        description: description,
        phoneNumber: phoneNumber,
        location: location,
        image: image,
      };

      dispatch(updateUser(updatedUser))
        .then(() => {
          setIsEditing(false);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          window.alert('Error updating user. Please try again.');
        });
    }
  };

  const handleCancel = () => {
    setUserName(user.userName);
    setDescription(user.description);
    setPhoneNumber(user.phoneNumber);
    setLocation(user.location);
    setIsEditing(false);
    setErrors({});
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Acá va la lógica para subir la imagen a Cloudinary
    console.log('Imagen seleccionada:', file);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId))
        .then(() => {
          // Acá se puede manejar cualquier acción adicional después de la eliminación
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          window.alert('Error deleting user. Please try again.');
        });
    }
  };

  const validate = (input) => {
    let errors = {};

    if (!input.userName) {
      errors.userName = 'Need a user name';
    }

    return errors;
  };

  return (
    <div className={styles.userCard}>
      <img src={image} className={styles.image} />
      <h3>{user.userName}</h3>
      {isEditing ? (
        <>
          <p>
            Username:{' '}
            <input
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={styles.input}
              placeholder='Enter a user name'
            />
            {errors.userName && (
              <span className={styles.error}>{errors.userName}</span>
            )}
          </p>
          <p>
            Description:{' '}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.input}
              placeholder='Enter a description'
            />
          </p>
          <p>
            Phone Number:{' '}
            <input
              type='number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={styles.input}
              placeholder='Enter a number'
            />
          </p>
          <p>
            Location:{' '}
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
              placeholder='Enter an location'
            />
          </p>
          <p>
            Profile picture:{' '}
            <input type='file' accept='image/*' onChange={handleImageChange} />
          </p>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(user.userId)}
          >
            <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
          </button>
        </>
      ) : (
        <>
          <p>Email: {user.email}</p>
          <p>UserId: {user.userId}</p>
          <p>Description: {user.description}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Location: {user.location}</p>
          <button className={styles.editButton} onClick={handleEdit}>
            <i className={`fas fa-pencil-alt ${styles.editIcon}`} />
          </button>
        </>
      )}
    </div>
  );
};

export default UserCard;
