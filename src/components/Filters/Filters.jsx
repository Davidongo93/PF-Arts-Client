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
    category: '',
    orderType: '',
    order: '',
    minPrice: '',
    maxPrice: '',
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
    const { minPrice, maxPrice, order, category, orderType } = filters;
    dispatch(getArtsByFilters(minPrice, maxPrice, order, category, orderType));
    setCurrentPage(1);
    navigate(`/?page=1`);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFilterSubmit}>
        <label>
          <select name='category' value={filters.category} onChange={handleFilterChange}>
            <option value='' disabled>
              Category
            </option>
            <option value=''>All</option>
            <option value='Painting'>Painting</option>
            <option value='Illustration'>Illustration</option>
            <option value='3D'>3D</option>
            <option value='Collage'>Collage</option>
            <option value='Pixel Art'>Pixel Art</option>
            <option value='Photography'>Photography</option>
          </select>
        </label>
        <label>
          <select name='orderType' value={filters.orderType} onChange={handleFilterChange}>
            <option value=''>Order By</option>
            <option value='title'>Title</option>
            <option value='price'>Price</option>
          </select>
          {filters.orderType === 'title' && (
            <select name='order' value={filters.order} onChange={handleFilterChange}>
              <option value=''>Random</option>
              <option value='ASC'>A-Z</option>
              <option value='DESC'>Z-A</option>
            </select>
          )}
          {filters.orderType === 'price' && (
            <>
              <select name='order' value={filters.order} onChange={handleFilterChange}>
                <option value=''>Random</option>
                <option value='ASC'>Low to High</option>
                <option value='DESC'>High to Low</option>
              </select>
              <input type='number' name='minPrice' value={filters.minPrice} onChange={handleFilterChange} placeholder='Min.' />
              <p>__</p>
              <input type='number' name='maxPrice' value={filters.maxPrice} onChange={handleFilterChange} placeholder='Max.' />
            </>
          )}
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
