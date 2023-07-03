import { NavLink } from 'react-router-dom';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={style['footer-container']}>
      <div className={style['footer-content']}>
        <p className={style['footer-text']}>
          Henry Art Gallery ©{' '}
          <span className={style['footer-year']}>
            {new Date().getFullYear()}{' '}
          </span>
        </p>
        <div className={style['links-container']}>
          <NavLink to='/advisory' activeclassname={style['active-link']}>
            Advisory Services
          </NavLink>
          <NavLink to='/FAQ' activeclassname={style['active-link']}>
            Buyer FAQ
          </NavLink>
          <NavLink to='/about-us' activeclassname={style['active-link']}>
            About us
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
