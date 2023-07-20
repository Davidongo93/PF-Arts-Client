import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Detail from './views/Detail/Detail';
import Form from './views/Form/Form';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import AdvisoryServices from './components/Footer/A-Services/A-Services';
import Buyer from './components/Footer/Buyer/Buyer';
import Aboutus from './components/Footer/Aboutus/About';
import Footer from './components/Footer/Footer';
import Favorites from './views/Favorites/Favorites';
import Users from './views/Users/Users';
import UserDetail from './views/UserDetail/UserDetail';
import Cart from './views/Cart/Cart';
import Checkout from './views/Checkout/Checkout';
import Dashboard from './views/Dashboard/Dashboard';
import VerifyToken from './components/VerifyToken/VerifyToken';
import Orders from './views/Orders/Orders';
import Reports from './views/Reports/Reports';
import Products from './views/Products/Products';
import Customers from './views/Customers/Customers';
import FloatingNotification from './components/FloatingNotifications/FloatingNotifications';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const loggedUser = useSelector((state) => state.loggedUser);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const allowedRoutes = ['/', '/register', '/login', '/verify', '/detail/:id', '/advisory', '/about-us', '/FAQ'];

  if (isLoggedIn) {
    allowedRoutes.push('/favorites/:userId', '/users', '/users/detail/:userId', '/cart', '/checkout', '/create');
  }

  const restrictedAdminRoutes = ['/dashboard', '/reports', '/orders', '/customers', '/products'];

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      {location.pathname !== '/register' && location.pathname !== '/login' && <Navbar />}
      {location.pathname !== '/register' && location.pathname !== '/login' && (
        <button className='darkModeButton' onClick={toggleDarkMode}>
          {darkMode ? <FaSun className='icon' /> : <FaMoon className='icon' />}
        </button>
      )}
      <Routes>
        <Route path='/verify' element={<VerifyToken />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        {allowedRoutes.includes('/create') && <Route path='/create' element={<Form />} />}
        {allowedRoutes.includes('/advisory') && <Route path='/advisory' element={<AdvisoryServices />} />}
        {allowedRoutes.includes('/about-us') && <Route path='/about-us' element={<Aboutus />} />}
        {allowedRoutes.includes('/FAQ') && <Route path='/FAQ' element={<Buyer />} />}
        {allowedRoutes.includes('/favorites/:userId') && <Route path='/favorites/:userId' element={<Favorites />} />}
        {allowedRoutes.includes('/users') && <Route path='/users' element={<Users />} />}
        {allowedRoutes.includes('/users/detail/:userId') && <Route path='/users/detail/:userId' element={<UserDetail />} />}
        {allowedRoutes.includes('/cart') && <Route path='/cart' element={<Cart />} />}
        {allowedRoutes.includes('/checkout') && <Route path='/checkout' element={<Checkout />} />}
        {loggedUser.role === 'admin' && (
          <>
            {restrictedAdminRoutes.includes('/dashboard') && <Route path='/dashboard' element={<Dashboard />} />}
            {restrictedAdminRoutes.includes('/reports') && <Route path='/reports' element={<Reports />} />}
            {restrictedAdminRoutes.includes('/orders') && <Route path='/orders' element={<Orders />} />}
            {restrictedAdminRoutes.includes('/customers') && <Route path='/customers' element={<Customers />} />}
            {restrictedAdminRoutes.includes('/products') && <Route path='/products' element={<Products />} />}
          </>
        )}
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
      {location.pathname !== '/register' && location.pathname !== '/login' && <Footer />}
      <FloatingNotification />
    </div>
  );
}

export default App;
