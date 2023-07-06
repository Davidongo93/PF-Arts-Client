import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedUser } from '../../redux/actions';
import './Navbar.style.css';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.loggedUser);

  const { userName, profilePicture, userId } = loggedUser;

  const storedUser = localStorage.getItem('token');

  useEffect(() => {
    if (storedUser) {
      setLoggedIn(true);
      // Recuperar los datos del usuario almacenados en localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(setLoggedUser(user));
    }
  }, [dispatch, storedUser]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled =
        window.scrollY > 0 && !location.pathname.includes('/detail');

      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const handleNavigate = () => {
    navigate(`/users/detail/${userId}`);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <NavMenu userId={userId} />
      <div className='navbar-title' onClick={handleHome}>
        <span className='logo'>aA</span>
        <span className='space'> </span>
      </div>
      <span className='sub'>BETA</span>
      <div className='navlinks-container'>
        {loggedIn ? (
          <div className='profile-menu' onClick={handleNavigate}>
            <p className='user-welcome'>{userName}</p>
            <div className='profile-menu-photo-container'>
              <img src={profilePicture} alt='' className='profile-menu-photo' />
            </div>
          </div>
        ) : (
          <NavLink to='/login' className='navlinks'>
            Log in
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
