import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import UserDetail from './components/UserDetail/UserDetail';
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      {location.pathname !== '/register' &&
        location.pathname !== '/login' && ( //Verifica si las rutas son estas no se muestra el icono
          <Navbar />
        )}
      {location.pathname !== '/register' && location.pathname !== '/login' && (
        <button className='darkModeButton' onClick={toggleDarkMode}>
          {darkMode ? <FaSun className='icon' /> : <FaMoon className='icon' />}
        </button>
      )}
      <Routes>
        <Route path='/verify/' element={<VerifyToken />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<Form />} />
        <Route path='/advisory' element={<AdvisoryServices />} />
        <Route path='/about-us' element={<Aboutus />} />
        <Route path='/FAQ' element={<Buyer />} />
        <Route path='/favorites/:userId' element={<Favorites />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/detail/:userId' element={<UserDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/products' element={<Products />} />
        <Route path='/customers' element={<Customers />} />
      </Routes>
      {location.pathname !== '/register' && location.pathname !== '/login' && (
        <Footer />
      )}
      <FloatingNotification />
    </div>
  );
}

export default App;
