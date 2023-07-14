/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFavorite, deleteFavorite, getFavorites } from '../../redux/actions';
import styles from './Card.module.css';

function Card({ art, imageSize, containerSize, onDelete }) {
  const dispatch = useDispatch();
  const { image, artworkId, title } = art;
  const [isFav, setIsFav] = useState(false);
  // const myFavorites = useSelector((state) => state.myFavorites);
  const loggedUser = useSelector((state) => state.loggedUser);

  const { userId } = loggedUser;

  const handleFavorite = (event) => {
    event.preventDefault();
    if (!userId) {
      return; // No se realiza ninguna acción si el usuario no está logeado
    }

    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(userId, artworkId)).then(() => {
        // const updatedFavorites = myFavorites.userFav.filter((fav) => fav.artworkId !== artworkId);
        // const userFavString = JSON.stringify(updatedFavorites);
        // localStorage.setItem('Favorites', userFavString);
        onDelete();
      });
    } else {
      setIsFav(true);
      dispatch(addFavorite(userId, artworkId, art)).then(() => {
        // const updatedFavorites = [...myFavorites.userFav, art];
        // const userFavString = JSON.stringify(updatedFavorites);
        // localStorage.setItem('Favorites', userFavString);
      });
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(getFavorites(userId))
        .then((res) => {
          console.log('dispatch getfavorites', userId);
          if (res.data && res.data.userFav) {
            const userFavString = JSON.stringify(res.data.userFav);
            // localStorage.setItem('Favorites', userFavString);
            const favorites = JSON.parse(userFavString);
            const isFavorite = favorites.some((favorite) => favorite.title === title);
            setIsFav(isFavorite);
          }
        })
        .catch((error) => {
          console.error('Error al obtener favoritos:', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={styles['cardContainer']} style={{ width: containerSize, height: '350px' }}>
      <button className={styles['likeStyle']} onClick={handleFavorite} disabled={!userId}>
        {isFav ? <span className={styles['red']}>♥️</span> : <span className={styles['white']}>♥️</span>}
      </button>
      <div className={styles['imgContainer']}>
        <img src={image} alt='pic' style={{ width: imageSize, height: '350px' }} />
      </div>
      <div className={styles['propsContainer']} />
    </div>
  );
}

Card.propTypes = {
  art: PropTypes.shape({
    image: PropTypes.string.isRequired,
    artworkId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
