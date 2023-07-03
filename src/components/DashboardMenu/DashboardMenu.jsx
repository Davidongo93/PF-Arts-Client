import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaClipboardList,
  FaChartBar,
  FaBox,
  FaUser,
} from 'react-icons/fa';
import styles from './DashboardMenu.module.css';

const DashboardMenu = () => {
  return (
    <ul className='nav flex-column'>
      <li className='nav-item'>
        <NavLink
          className={`nav-link ${styles['custom-link']}`}
          activeClassName='active'
          to='/dashboard'
        >
          <FaHome /> Dashboard <span className='sr-only'>(current)</span>
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          className={`nav-link ${styles['custom-link']}`}
          activeClassName='active'
          to='/orders'
        >
          <FaClipboardList /> Orders
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          className={`nav-link ${styles['custom-link']}`}
          activeClassName='active'
          to='/reports'
        >
          <FaChartBar /> Reports
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          className={`nav-link ${styles['custom-link']}`}
          activeClassName='active'
          to='/products'
        >
          <FaBox /> Products
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          className={`nav-link ${styles['custom-link']}`}
          activeClassName='active'
          to='/customers'
        >
          <FaUser /> Customers
        </NavLink>
      </li>
    </ul>
  );
};

export default DashboardMenu;
