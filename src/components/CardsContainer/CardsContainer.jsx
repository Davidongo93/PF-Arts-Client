import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getAllArts } from '../../redux/actions';
import Card from '../../components/Card/Card';
import Searchbar from '../../components/SearchBar/Searchbar';
import Filters from '../../components/Filters/Filters';
import CustomPagination from '../../components/Pagination/Pagination';
import Loader from '../Loader/Loader';
import styles from './CardsContainer.module.css';

const CardsContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const allArts = useSelector((state) => state.allArts);
  const [currentPage, setCurrentPage] = useState(1);
  const artsPerPage = 8;
  const indexOfLastArt = currentPage * artsPerPage;
  const indexOfFirstArt = indexOfLastArt - artsPerPage;
  const [currentArts, setCurrentArts] = useState(allArts.slice(indexOfFirstArt, indexOfLastArt));
  const [isLoading, setIsLoading] = useState(false);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber);
    const newSearch = searchParams.toString();
    navigate(`/?${newSearch}`);
  };

  useEffect(() => {
    setIsLoading(true);
    if (allArts.length === 0) {
      dispatch(getAllArts()).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentArts(allArts.slice(indexOfFirstArt, indexOfLastArt));
  }, [allArts, currentPage, indexOfFirstArt, indexOfLastArt]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = Number(searchParams.get('page')) || 1;
    setCurrentPage(page);
  }, [location.search]);

  return (
    <div>
      <div>
        <div className={styles['searchContainer']}>
          <Searchbar setCurrentPage={setCurrentPage} />
          <Filters setCurrentPage={setCurrentPage} />
        </div>
        {isLoading ? (
          <Loader />
        ) : currentArts.length === 0 ? (
          <div className={styles['no-results']}>
            <p>No results found</p>
          </div>
        ) : (
          <div className={styles['CardsContainer']}>
            {currentArts.map((art) => (
              <NavLink to={`/detail/${art.id}`} key={art.id} className={styles.link}>
                <Card art={art} />
              </NavLink>
            ))}
          </div>
        )}
        <CustomPagination artsPerPage={artsPerPage} allArts={allArts.length} currentPage={currentPage} pagination={pagination} />
      </div>
    </div>
  );
};

export default CardsContainer;
