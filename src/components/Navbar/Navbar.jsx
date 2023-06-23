import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { auth } from '../../Firebase/config';
import { signOut } from 'firebase/auth';
import NavMenu from '../NavMenu/NavMenu';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './Navbar.style.css';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0 && !location.pathname.includes('/detail');

      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('email');
      setLoggedIn(false);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('email', user.email);
        setLoggedIn(true);
      } else {
        localStorage.removeItem('email');
        setLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <NavMenu />
      <div className='navbar-title'>Henry Art Gallery</div>
      <div className='navlinks-container'>
        {loggedIn ? (
          <NavLink className='navlinks' onClick={handleLogout}>
            Log out
          </NavLink>
        ) : (
          <NavLink to='/login' className='navlinks'>
            Log in / Sign up
          </NavLink>
        )}
        <NavLink to='/cart' className='navlinks'>
          <AiOutlineShoppingCart className='cartLogo' />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
