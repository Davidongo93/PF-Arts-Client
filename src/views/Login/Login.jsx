/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoggedUser,
  setIsLoggedIn,
  showNotification,
  setCartItems,
} from '../../redux/actions';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import axios from 'axios';
import styles from './Login.module.css';
import landing from '../../assets/img/Landing_11zon.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const allUsers = useSelector((state) => state.allUsers);

  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loginError, setLoginError] = useState(false);

  function validate(input) {
    let errors = {};
    if (!input.username) {
      errors.username = 'Username is required';
    }
    if (!input.password) {
      errors.password = 'Password is required';
    }
    return errors;
  }

  useEffect(() => {
    dispatch(setCartItems([]));
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setShowAlert(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(input);
    setErrors(errors);
    setSubmitted(true);

    if (Object.keys(errors).length === 0 && input.username && input.password) {
      try {
        const response = await axios.post('/users/login', {
          username: input.username,
          password: input.password,
        });

        const { token, success } = response.data;

        if (success) {
          const loginUser = allUsers.find(
            (user) => user.userName === input.username
          );
          dispatch(setLoggedUser(loginUser)); //Almacena los detalles del usuario autenticado.
          dispatch(setIsLoggedIn(true)); //Indica que el usuario inicio sesión y me sirve para el cart.
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(loginUser));
          dispatch(showNotification('Login successfully'));
          console.log('Login successfully', token);
          setInput({
            username: '',
            password: '',
          });
          console.log('loginredirect2home');
          navigate('/');
        } else {
          setLoginError(true); // Mostrar mensaje de error
        }
      } catch (error) {
        console.error('Error:', error);
        setLoginError(true); // Mostrar mensaje de error
      }
    } else {
      setLoginError(true); // Mostrar mensaje de error
    }
  }

  return (
    <div className={styles['login-container']}>
      <div>
        <span className={styles['logoArt']}>aA</span>
      </div>
      <span className={styles['sub']}>BETA</span>
      <div className={styles['landingImage']}>
        <img className={styles['image']} src={landing} alt='' />
      </div>
      <div className={styles['sloganContainer']}>
        <span className={styles['slogan']}>Showcase Art.</span>
      </div>
      <span className={styles['sloganL']}>Showcase Art.</span>
      <div className={styles['registerContainer']}>
        <NavLink to='/register'>
          <button className={styles['register']}>Sign up</button>
        </NavLink>
      </div>
      <div className={styles['exploreContainer']}>
        <NavLink to='/'>
          <button className={styles['explore']}>Explore</button>
        </NavLink>
      </div>

      <Container className={styles['container']}>
        <Row className={styles['background']}>
          {/*  */}
          <Col className={styles['log']}>
            <h2 className={styles['header']}>Log in</h2>
            <div className='login'>
              <Form
                className={styles['allForm']}
                id='login'
                onSubmit={handleSubmit}
              >
                <Form.Group>
                  <Form.Label htmlFor='username'>
                    <span className={styles['username']}>username</span>
                    {errors.username && (
                      <span className={styles.error}>{errors.username}</span>
                    )}
                  </Form.Label>
                  <Form.Control
                    id='username'
                    type='text'
                    name='username'
                    value={input.username}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Enter your username'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor='password'>
                    <span className={styles['username']}>password</span>
                    {errors.password && (
                      <span className={styles.error}>{errors.password}</span>
                    )}
                  </Form.Label>
                  <Form.Control
                    id='password'
                    type='password'
                    name='password'
                    value={input.password}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Enter your password'
                  />
                </Form.Group>
                <div className={styles['loginButtonContainer']}>
                  <Button
                    variant='primary'
                    type='submit'
                    id='ingresar'
                    className={styles['loginButton']}
                    onClick={handleSubmit}
                  >
                    Log in
                  </Button>
                  <GoogleButton />
                  {showConfirmation && (
                    <p className={styles.confirmation}>Ready!</p>
                  )}
                </div>
                {showAlert && (
                  <p className={styles.error2}>Invalid username or password</p>
                )}
                {loginError && (
                  <p className={styles.error2}>Invalid username or password</p>
                )}
              </Form>
              {/* LOGIN REDES SOCIALES */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
