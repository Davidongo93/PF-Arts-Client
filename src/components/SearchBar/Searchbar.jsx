import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllArts, getArtsByTitle, getArtsByAuthor } from '../../redux/actions';
import { MdSearch } from 'react-icons/md';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

const Searchbar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery) {
      dispatch(getAllArts());
    } else {
      dispatch(getArtsByTitle(searchQuery));
      dispatch(getArtsByAuthor(searchQuery));
      setCurrentPage(1);
    }
  };

  return (
    <div className={style['searchbar-container']}>
      <form onSubmit={handleSubmit}>
        <input className={style['NavSearch']} placeholder='Search by title/author...' type='search' value={searchQuery} onChange={handleChange} />
        <button className={style['BottonSearch']} type='submit'>
          <MdSearch className={style['icon']} />
        </button>
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Searchbar;
