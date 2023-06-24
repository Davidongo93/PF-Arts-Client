import './NavMenu.css';
import { useState, useEffect } from 'react';
import { BsFillHouseFill, BsPersonFill } from 'react-icons/bs';
import { GiPencilBrush } from 'react-icons/gi';
import { FaPowerOff } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai'

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
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
      <div
        className={`navbar-menu ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
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
            <NavLink to='/favorites' onClick={toggleMenu}>
            <AiFillHeart />
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
          {/* <li>
            <GiPencilBrush />
            <NavLink to="/MyCreations" onClick={toggleMenu}>
              My creations
            </NavLink>
          </li>
          <hr /> */}
          <li>
            <FaPowerOff />
            <NavLink to='/login' onClick={toggleMenu}>
              {' '}
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
