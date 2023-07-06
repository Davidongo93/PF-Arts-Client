/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { BsFillHouseFill, BsPersonFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { GiPencilBrush } from 'react-icons/gi';
import { FaPowerOff } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { IoStatsChartSharp } from 'react-icons/io5';
import { auth } from '../../Firebase/config';
import { signOut } from 'firebase/auth';
import { showNotification, setIsLoggedIn } from '../../redux/actions';
import './NavMenu.css';

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const loggedUser = useSelector((state) => state.loggedUser);
  const storedUserJSON = localStorage.getItem('user');
  const storedUser = JSON.parse(storedUserJSON);
  const userAdmin = storedUser?.role === 'admin';

  const { userId } = loggedUser;

  const dispatch = useDispatch();

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('cartItems');
    localStorage.clear();
    signOut(auth).then(() => {
      setLoggedIn(false);
      dispatch(setIsLoggedIn(false)); // Eliminar los elementos del carrito del localStorage
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const menuOptions = document.querySelector('.menu-options');
      if (!menuOptions.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <nav>
      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`menu-options ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <BsFillHouseFill />
            <NavLink to='/' onClick={toggleMenu}>
              {' '}
              Home
            </NavLink>
          </li>
          <hr />
          <li>
            <BsPersonFill />
            <NavLink to='/users' onClick={toggleMenu}>
              {' '}
              Artists
            </NavLink>
          </li>
          {userId && (
            <>
              <hr />
              <li>
                <AiFillHeart />
                <NavLink to={`/favorites/${userId}`} onClick={toggleMenu}>
                  {' '}
                  Favorites
                </NavLink>
              </li>
            </>
          )}
          {userId && (
            <>
              <hr />
              <li>
                <GiPencilBrush />
                <NavLink to='/create' onClick={toggleMenu}>
                  {' '}
                  Create
                </NavLink>
              </li>
            </>
          )}
          {userAdmin && (
            <>
              <hr />
              <li>
                <IoStatsChartSharp />
                <NavLink to='/dashboard' onClick={toggleMenu}>
                  {' '}
                  Dashboard
                </NavLink>
              </li>
            </>
          )}
          {userId && (
            <>
              <hr />
              <li>
                <FaPowerOff />
                <NavLink to='/login' onClick={() => handleLogout()}>
                  {' '}
                  Log Out
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
