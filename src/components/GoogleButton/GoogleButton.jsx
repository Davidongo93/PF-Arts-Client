/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../Firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsers,
  postUsers,
  updateUser,
  setLoggedUser,
  showNotification,
  setIsLoggedIn,
} from '../../redux/actions';
import axios from 'axios';
import googleLogo from '../../assets/img/google.png';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import styles from './GoogleButton.module.css';

const GoogleButton = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      const { photoURL } = data.user;
      const { email, firstName } = data._tokenResponse;

      const userExists = allUsers.find((user) => user.email === email);

      if (userExists) {
        try {
          const response = await axios.post('/users/login', {
            username: userExists.userName,
            password: userExists.password,
          });

          const { token, success } = response.data;

          if (success) {
            const loginUser = allUsers.find((user) => user.email === email);
            dispatch(setLoggedUser(loginUser));
            dispatch(setIsLoggedIn(true));
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(loginUser));
            navigate('/');
            dispatch(showNotification('Login successfully'));
          } else {
            setLoginError(true); // Mostrar mensaje de error
            dispatch(showNotification('Login error'));
          }
        } catch (error) {
          console.error('Error:', error);
          setLoginError(true); // Mostrar mensaje de error
          dispatch(showNotification(error.message));
        }

        if (!userExists.googleUser) {
          const updatedUser = {
            ...userExists,
            profilePicture: photoURL,
            googleUser: true,
            verified: true,
          };
          console.log(updatedUser);
          dispatch(updateUser(updatedUser));
          localStorage.setItem('user', JSON.stringify(updatedUser));
          dispatch(showNotification('Login successfully'));
        }
      } else {
        const newPassword = data._tokenResponse.idToken.slice(0, 12);
        const newUser = {
          userName: firstName,
          email: email,
          password: newPassword,
          profilePicture: photoURL,
          googleUser: true,
          verified: true,
        };
        console.log(newUser);
        dispatch(postUsers(newUser)).then(async () => {
          try {
            const response = await axios.post('/login', {
              username: newUser.userName,
              password: newUser.password,
            });

            const { token, success } = response.data;

            if (success) {
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(newUser));
              navigate('/');
              dispatch(showNotification('Login successfully'));
            } else {
              setLoginError(true); // Mostrar mensaje de error
              dispatch(showNotification('Login error'));
            }
          } catch (error) {
            console.error('Error:', error);
            setLoginError(true); // Mostrar mensaje de error
            dispatch(showNotification(error.message));
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError(true); // Mostrar mensaje de error
    }
  };

  useEffect(() => {
    dispatch(getAllUsers());
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // if (user) {
      //   navigate('/');
      // }
    });

    return unsubscribe;
  }, [dispatch, navigate]);

  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);

  return (
    <div className={styles['google']}>
      <Container>
        <Row>
          <Col>
            <Button className={styles['button']} onClick={handleGoogleSignIn}>
              <Row>
                <Col>
                  <Image
                    className={styles['googleLogo']}
                    src={googleLogo}
                    alt=''
                  />
                </Col>
              </Row>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GoogleButton;
