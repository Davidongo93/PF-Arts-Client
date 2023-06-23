import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { auth, googleProvider } from '../../Firebase/config';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import googleLogo from '../../assets/img/google.png';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
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
        const response = await axios.post('http://localhost:3001/users/login', {
          username: input.username,
          password: input.password,
        });

        const { token, success } = response.data;

        if (success) {
          localStorage.setItem('token', token);
          console.log(token);
          setInput({
            username: '',
            password: '',
          });
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

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((data) => {
        setInput({
          ...input,
          username: data.user.email,
        });
        localStorage.setItem('email', data.user.email);
      })
      .catch((error) => {
        console.error('Google Sign-in Error:', error);
        setLoginError(true); // Mostrar mensaje de error
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });

    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    setInput({
      ...input,
      username: localStorage.getItem('email') || '',
    });
  }, []);

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
                  <Form.Control
                    id='username'
                    type='text'
                    name='username'
                    value={input.username}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Enter your username'
                  />
                  {errors.username && <p className={styles.error}>{errors.username}</p>}
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='password'>Password:</Form.Label>
                  <Form.Control
                    id='password'
                    type='password'
                    name='password'
                    value={input.password}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Enter your password'
                  />
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

              <Container className='w-100 my-3'>
                <Row>
                  <Col>
                    <Button variant='outline-danger' className='w-100 my-1' onClick={handleGoogleSignIn}>
                      <Row className='align-items-center'>
                        <Col xs={1} className='d-block'>
                          <Image src={googleLogo} width='24' alt='' />
                        </Col>
                        <Col xs={10} md={10} className='text-center'>
                          Log in with Google
                        </Col>
                      </Row>
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
