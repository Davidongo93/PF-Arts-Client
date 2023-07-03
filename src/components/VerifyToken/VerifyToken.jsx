import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyToken = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log(token);

    const verifyToken = async () => {
      try {
        await axios.post('http://localhost:3001/users/verify', { token });
        console.log('Token verified successfully');
        navigate('/'); 
      } catch (error) {
        console.error('Error verifying token:', error.response.data.error);
        navigate('/register'); 
      }
    };

    if (token) {
      verifyToken();
    } else {
      navigate('/login');
    }
  }, [location.search, navigate]);


  return <div>Cargando...</div>;
};

export default VerifyToken;
