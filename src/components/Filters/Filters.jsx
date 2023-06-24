import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getArtsByFilters } from '../../redux/actions';
import styles from './Filters.module.css';

const Filters = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    century: '',
    order: '',
    created: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const { century, order, created } = filters;
    dispatch(getArtsByFilters(century, order, created));
    setCurrentPage(1);
    navigate(`/?page=1`);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFilterSubmit}>
        <label>
          <span className={styles.span}>By Century </span>
          <select name='century' value={filters.century} onChange={handleFilterChange}>
            <option value=''>All</option>
            <option value='15'>15th</option>
            <option value='16'>16th</option>
            <option value='17'>17th</option>
            <option value='18'>18th</option>
            <option value='19'>19th</option>
            <option value='20'>20th</option>
            <option value='21'>21st</option>
          </select>
        </label>
        <label>
          <span className={styles.span}>By Price </span>
          <select name='order' value={filters.order} onChange={handleFilterChange}>
            <option value=''>All</option>
            <option value='ASC'>Lowest</option>
            <option value='DESC'>Highest</option>
          </select>
        </label>
        <label>
          <span className={styles.span}>By Source </span>
          <select name='created' value={filters.created} onChange={handleFilterChange}>
            <option value=''>All</option>
            <option value='true'>Users Art</option>
            <option value='false'>Historical Art</option>
          </select>
        </label>
        <button type='submit'>Apply Filters</button>
      </form>
    </div>
  );
};

Filters.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Filters;
