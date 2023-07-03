import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './UserCard.module.css';

const UserCard = ({ user, art }) => {
  const { userName, userId, profilePicture } = user;

  const countMatchingArtworks = () => {
    const matchingArtworks = art.filter((artwork) => artwork.userId === userId);
    return matchingArtworks.length;
  };

  const matchingArtworksCount = countMatchingArtworks();

  return (
    <div className={styles['userCard']}>
      <img src={profilePicture} className={styles['imageU']} />
      <h3>{userName}</h3>
      <div className={styles['backG']}>
        <NavLink className={styles['detailButton']} to={`/users/detail/${userId}`}>
          Detail
        </NavLink>
      </div>
      <p className={styles['artworks']}>
        Artworks <sup className={styles['expo']}>{matchingArtworksCount}</sup>
      </p>
    </div>
  );
};
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  art: PropTypes.array.isRequired,
};

export default UserCard;
