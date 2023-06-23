import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { addFavorite, deleteFavorite } from '../../redux/actions';
import styles from './Card.module.css';

function Card({  art }) {
  const dispatch = useDispatch();
  const { image } = art;
  const [isFav, setIsFav] = useState(false);
  const myFavorites = useSelector(state => state.myFavorites);

  useEffect(() => {
    const isFavorite = myFavorites.map((fav) => fav.title).includes(art);
    setIsFav(isFavorite);
  }, [art, myFavorites]);  

  const handleFavorite = (event) => {
    event.preventDefault(); // Detenemos el comportamiento predeterminado del enlace NavLink
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(art));
    } else {
      setIsFav(true);
      dispatch(addFavorite({art}));
    }
  };  

  return (
    <div className={styles['cardContainer']}>
      <button className={styles['likeStyle']} onClick={handleFavorite}>
        {isFav ? '❤️' : '🤍'}
      </button>
      <div className={styles['imgContainer']}>
        <img src={image} alt={'pic'} />
      </div>
      <div className={styles['propsContainer']}/>
    </div>
  );
}

Card.propTypes = {
  art: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
