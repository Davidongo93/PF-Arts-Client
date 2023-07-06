/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedUser, setIsLoggedIn, showNotification, setCartItems } from '../../redux/actions';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import axios from 'axios';
import styles from './Login.module.css';

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
          const loginUser = allUsers.find((user) => user.userName === input.username);
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
      <Container className='w-100 bg-primary rounded shadow'>
        {/* Background */}
        <Row className={`${styles['bg-box']} align-items-stretch`}>
          <Col className='d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded'></Col>
          {/*  */}

          <Col className='bg-white p-3 p-md-5 rounded-end'>
            <div className='logo-box text-center'>{/* <Image src='./img/logo.jpg' id='logo' width='100' alt='' /> */}</div>
            <h2 className='fw-bold text-center py-3 py-md-5'>Log In</h2>
            <div className='login'>
              <Form id='login' onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='username'>Username:</Form.Label>
                  <Form.Control id='username' type='text' name='username' value={input.username} onChange={handleChange} className={styles.input} placeholder='Enter your username' />
                  {errors.username && <p className={styles.error}>{errors.username}</p>}
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='password'>Password:</Form.Label>
                  <Form.Control id='password' type='password' name='password' value={input.password} onChange={handleChange} className={styles.input} placeholder='Enter your password' />
                  {errors.password && <p className={styles.error}>{errors.password}</p>}
                </Form.Group>
                <div className='d-grid'>
                  <Button variant='primary' type='submit' id='ingresar' className='btn-sm' onClick={handleSubmit}>
                    Log in
                  </Button>
                </div>
                {showConfirmation && <p className={styles.confirmation}>Ready!</p>}
                {showAlert && <p className={styles.error}>Invalid username or password</p>}
                {loginError && <p className={styles.error}>Invalid username or password</p>}
                <div className='mb-3'>
                  <p>
                    Don&apos;t have an account? <NavLink to='/register'>Sign up</NavLink>
                  </p>
                </div>
              </Form>
              {/* LOGIN REDES SOCIALES */}
              <GoogleButton />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
