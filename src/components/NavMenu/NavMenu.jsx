/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { BsFillHouseFill, BsPersonFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { GiPencilBrush } from 'react-icons/gi';
import { FaPowerOff } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { IoStatsChartSharp } from 'react-icons/io5';
import { auth } from '../../Firebase/config';
import { signOut } from 'firebase/auth';
import './NavMenu.css';

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const loggedUser = useSelector((state) => state.loggedUser);

  const { userId } = loggedUser;

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setLoggedIn(false);
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
          <hr />
          <li>
            <AiFillHeart />
            <NavLink to={`/favorites/${userId}`} onClick={toggleMenu}>
              {' '}
              Favorites
            </NavLink>
          </li>
          <hr />
          <li>
            <GiPencilBrush />
            <NavLink to='/create' onClick={toggleMenu}>
              {' '}
              Create
            </NavLink>
          </li>
          <hr />
          <li>
            <IoStatsChartSharp />
            <NavLink to='/dashboard' onClick={toggleMenu}>
              {' '}
              Dashboard
            </NavLink>
          </li>
          <hr />
          <li>
            <FaPowerOff />
            <NavLink to='/login' onClick={() => handleLogout()}>
              {' '}
              Log Out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
