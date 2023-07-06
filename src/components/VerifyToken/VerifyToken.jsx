import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { showNotification } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const VerifyToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log(token);

    const verifyToken = async () => {
      try {
        await axios.post('/users/verify', { token });
        console.log('Token verified successfully');
        dispatch(showNotification('Email verified, Please login with your username and password.'));
        navigate('/');
      } catch (error) {
        console.error('Error verifying token:', error.response.data.error);
        dispatch(showNotification('Error verifying token', 'error'));
        navigate('/register');
      }
    };

    if (token) {
      verifyToken();
    } else {
      navigate('/login');
    }
  }, [location.search, navigate, dispatch]);

  return <div>Cargando...</div>;
};

export default VerifyToken;
