import styles from "./Favorites.modules.css?inline";//Este enfoque utiliza una consulta especial en la ruta del archivo de estilo para incluir directamente los estilos CSS en el archivo JavaScript en lugar de cargarlos por separado.
import Card from '../../components/Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getFavorites } from '../../redux/actions';
import Searchbar from "../../components/SearchBar/Searchbar";
import Filters from "../../components/Filters/Filters";
import Loader from "../../components/Loader/Loader";
import CustomPagination from "../../components/Pagination/Pagination";


const LOCAL_STORAGE_KEY = 'myFavorites';//*** */
const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const myFavorites = useSelector((state) => state.myFavorites);
  const [currentPage, setCurrentPage] = useState(1);
  const artsPerPage = 8;
  const indexOfLastArt = currentPage * artsPerPage;
  const indexOfFirstArt = indexOfLastArt - artsPerPage;
  const [currentArts, setCurrentArts] = useState(myFavorites.slice(indexOfFirstArt, indexOfLastArt));
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber);
    const newSearch = searchParams.toString();
    navigate(`/?${newSearch}`);
  };
 
  //*/*/*
  useEffect(() => {
   //*** */ // ↓Obtener los favoritos guardados en el almacenamiento local
    const storedFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // ↓Si hay favoritos almacenados, actualizar el estado de Redux
    if (storedFavorites) {
      dispatch({ type: 'SET_FAVORITES', payload: storedFavorites });
    }//**** */
    // ↓Obtener los favoritos del servidor
    dispatch(getFavorites());
  }, [dispatch]);

  ///** */
  useEffect(() => {
    // Guardar los favoritos en el almacenamiento local cuando se actualicen
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myFavorites));
  }, [myFavorites]);
  //*** */
  
  
  return (
    <div>
      <div className={styles['searchContainer']}>
        <Searchbar setCurrentPage={setCurrentPage} />
        <Filters setCurrentPage={setCurrentPage} />
      </div>
        {isLoading ? (<Loader />) 
        : currentArts.length === 0 
        ? (<div className={styles['no-results']}>
            <p>No results found</p>
          </div>)
        : (<div>
            {myFavorites.map((art) => (
              <div className={styles['boxFav']}key={art.id}>
                <Card art={art} />
           </div>
             ))}
          </div>
        )}
        <CustomPagination artsPerPage={artsPerPage} allArts={myFavorites.length} currentPage={currentPage} pagination={pagination} />
    </div>
  );
};

export default Favorites;
