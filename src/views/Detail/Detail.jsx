import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { addFavorite, clearDetail, deleteFavorite, getDetail, deleteArt, getAllArts, updateArtwork, addToCart, getFavorites } from '../../redux/actions';
import { FaShoppingCart, FaTwitter, FaFacebook, FaInstagram, FaPencilAlt } from 'react-icons/fa';
import Loader from '../../components/Loader/Loader';
import ReviewSection from '../ReviewSection/ReviewSection';
import frame from '../../assets/img/marco.png';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [enabledUserEdit, setEnabledUserEdit] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [price, setPrice] = useState('');
  const [showLoader, setShowLoader] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const detail = useSelector((state) => state.detail);
  const cartItems = useSelector((state) => state.cart);
  const myFavorites = useSelector((state) => state.myFavorites);
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = loggedUser;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(clearDetail());
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    setArtist(detail.authorName);
    setYear(detail.date);
    setDimensions(`${detail.width} x ${detail.height}`);
    setPrice(detail.price);
    enableEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  useEffect(() => {
    dispatch(getFavorites(userId)).then((res) => {
      const userFavString = JSON.stringify(res.data.userFav);
      localStorage.setItem('Favorites', userFavString);
      const favorites = JSON.parse(userFavString);
      const isFavorite = favorites.some((favorite) => favorite.title === detail.title);
      setIsFav(isFavorite);
    });
  }, [dispatch, detail.title, userId]);

  const handleFavorite = (event) => {
    event.preventDefault();
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(userId, detail.artworkId)).then(() => {
        const updatedFavorites = myFavorites.userFav.filter((fav) => fav.artworkId !== detail.artworkId);
        const userFavString = JSON.stringify(updatedFavorites);
        localStorage.setItem('Favorites', userFavString);
      });
    } else {
      setIsFav(true);
      dispatch(addFavorite(userId, detail.artworkId, detail)).then(() => {
        const updatedFavorites = [...myFavorites.userFav, detail];
        const userFavString = JSON.stringify(updatedFavorites);
        localStorage.setItem('Favorites', userFavString);
      });
    }
  };

  const handleBuy = () => {
    if (cartItems.length >= 4) {
      setShowNotification(true);
      return;
    }
    dispatch(addToCart(detail));
    navigate('/cart');
  };

  const enableEdit = () => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const storedUserId = user.userId;

      // Comparar storedUserId con el userId recibido por los parámetros
      if (storedUserId === detail.userId) {
        // Realizar acciones en caso de que sean iguales
        setEnabledUserEdit(true);
      } else {
        // Realizar acciones en caso de que no sean iguales
        setEnabledUserEdit(false);
      }
    }
  };

  const handleDelete = () => {
    dispatch(deleteArt(detail.artworkId));
    window.alert('Artwork deleted successfully');
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log(detail);
    const updatedArtwork = {
      ...detail,
      authorName: artist,
      height: dimensions.split(' x ')[1],
      width: dimensions.split(' x ')[0],
      date: year,
      price: price,
    };
    dispatch(updateArtwork(detail.artworkId, updatedArtwork))
      .then((response) => {
        console.log(response);
        if (response.data) {
          console.log('Artwork updated successfully:', response.data);
          setIsEditing(false);
        } else {
          console.error('Error updating artwork: Response data is undefined');
          window.alert('Error updating artwork. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error updating artwork:', error);
        window.alert('Error updating artwork. Please try again.');
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  function homeButton() {
    dispatch(getAllArts());
    navigate('/');
  }

  if (!detail || showLoader) {
    return <Loader />;
  }

  //------------ BOTONES DE REDES SOCIALES -------------------------------
  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(detail.title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };
  const handleInstagramShare = () => {
    const url = `https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };
  // ------------------------------------------------------------------------------

  return (
    <div className={styles.detailContainer}>
      <div className={styles.imgContainer}>
        <div className={styles.frameContainer}>
          <div className={styles.frame}>
            <img src={frame} alt='' />
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img src={detail.image} alt={detail.title} />
        </div>
      </div>
      <div className={styles.all}>
        <div className={styles.propsContainer}>
          <h3>{detail.title}</h3>
          <hr className={styles.hr} />
          <p>
            <span className={styles.prop}>Artist:</span> {isEditing ? <input type='text' value={artist} onChange={(e) => setArtist(e.target.value)} /> : <span>{detail.authorName}</span>}
          </p>
          <p>
            <span className={styles.prop}>Year:</span> {isEditing ? <input type='text' value={year} onChange={(e) => setYear(e.target.value)} /> : <span>{detail.date}</span>}
          </p>
          <p>
            <span className={styles.prop}>Dimensions:</span>{' '}
            {isEditing ? (
              <input type='text' value={dimensions} onChange={(e) => setDimensions(e.target.value)} />
            ) : (
              <span>
                {detail.height} x {detail.width}
              </span>
            )}
          </p>
          <p>
            <span className={styles.prop}>Price:</span> {isEditing ? <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} /> : <span>{detail.price} USD</span>}
          </p>
          {detail.user && detail.user.userName.length > 0 && (
            <div>
              <p>
                <span className={styles.prop}>Published By:</span>{' '}
                <Link to={`/users/detail/${detail.userId}`} className={styles.user}>
                  {detail.user.userName}
                </Link>
              </p>
            </div>
          )}
        </div>
        <div className={styles.editC}>
          {isEditing ? (
            <>
              <button className={styles.updateButtonSave} onClick={handleSave}>
                Save
              </button>
              <button className={styles.updateButtonCancel} onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            enabledUserEdit && (
              <button className={`${styles.updateButtonSave} ${styles.updateButtonCancel} ${styles.editButton}`} onClick={handleUpdate}>
                <FaPencilAlt className={styles.updateIcon} />
              </button>
            )
          )}
          {isEditing && detail.user && detail.user.userName.length > 0 && (
            <button
              className={styles.deleteButton}
              onClick={() => {
                handleDelete();
                homeButton();
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <button className={styles['likeStyle']} onClick={handleFavorite}>
          {isFav ? <span className={styles['red']}>♥️</span> : <span className={styles['white']}>♥️</span>}
        </button>
        <button className={styles.cartButton} onClick={handleBuy}>
          <FaShoppingCart className={styles.cartIcon} />
          Add to Cart
        </button>
        {showNotification && (
          <Alert variant='danger' onClose={() => setShowNotification(false)} dismissible>
            You cannot add more than 4 items to the cart.
          </Alert>
        )}

        <div>
          <div className={styles.shareButtons}>
            <button className={styles.shareButton} onClick={handleTwitterShare}>
              <FaTwitter className={styles.shareIcon} />
            </button>
            <button className={styles.shareButton} onClick={handleFacebookShare}>
              <FaFacebook className={styles.shareIcon} />
            </button>
            <button className={styles.shareButton} onClick={handleInstagramShare}>
              <FaInstagram className={styles.shareIcon} />
            </button>
          </div>
        </div>
        <ReviewSection artworkId={id} />
      </div>
    </div>
  );
};

export default Detail;
