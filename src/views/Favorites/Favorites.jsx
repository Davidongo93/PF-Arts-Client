import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getFavorites } from '../../redux/actions';
import Card from '../../components/Card/Card';
// import Loader from '../../components/Loader/Loader';
// import CustomPagination from '../../components/Pagination/Pagination';
// import NavMenu from '../../components/NavMenu/NavMenu';
import styles from './Favorites.module.css';

const LOCAL_STORAGE_KEY = 'myFavorites';

const Favorites = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [currentPage, setCurrentPage] = useState(1);
  // const artsPerPage = 8;
  // const pagination = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   const searchParams = new URLSearchParams(location.search);
  //   searchParams.set('page', pageNumber);
  //   const newSearch = searchParams.toString();
  //   navigate(`/?${newSearch}`);
  // };

  const myFavorites = useSelector((state) => state.myFavorites);

  useEffect(() => {
    dispatch(getFavorites(userId));
  }, [dispatch, userId]);

  const { userFav } = myFavorites;

  const numberOfFav = userFav ? userFav.length : userFav;

  const handleCardDelete = () => {
    // Actualiza el estado de la lista de favoritos después de eliminar un favorito
    dispatch(getFavorites(userId));
  };

  useEffect(() => {
    // Guardar los favoritos en el almacenamiento local cuando se actualicen
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myFavorites));
  }, [myFavorites]);

  return (
    <div className={styles['container']}>
      <div className={styles['textContainer']}>
        <p className={styles['text']}>
          Bookmarked Art <sup className={styles['expo']}>{numberOfFav}</sup>
        </p>
      </div>
      {numberOfFav === 0 ? (
        <div className={styles['no-results']}>
          <p>No favorites added</p>
        </div>
      ) : (
        <div className={styles['boxFav']}>
          {userFav &&
            userFav.map((fav) => (
              <NavLink
                to={`/detail/${fav.artworkId}`}
                key={fav.artworkId}
                className={styles.link}
              >
                <Card
                  art={fav}
                  imageSize='120px'
                  containerSize='120px'
                  onDelete={handleCardDelete}
                />
              </NavLink>
            ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
