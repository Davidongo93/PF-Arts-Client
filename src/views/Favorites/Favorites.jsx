import styles from "./Favorites.modules.css?inline";//Este enfoque utiliza una consulta especial en la ruta del archivo de estilo para incluir directamente los estilos CSS en el archivo JavaScript en lugar de cargarlos por separado.
import Card from '../../components/Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFavorites } from '../../redux/actions';

const Favorites = () => {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  return (
    <div>
      {myFavorites.map((art) => (
        <div className={styles['boxFav']}key={art.id}>
          <Card art={art} />
        </div>
      ))}
    </div>
  );
};

export default Favorites;
