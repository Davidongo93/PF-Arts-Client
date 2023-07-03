/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postUsers, setIsLoggedIn, showNotification } from '../../redux/actions';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './Register.module.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function validate(input) {
    let errors = {};
    if (!input.userName) {
      errors.userName = 'Need a user';
    }
    if (!input.email) {
      errors.email = 'Need an email';
    } else if (
      !/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/.test(input.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!input.password) {
      errors.password = 'Need a password';
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
        input.password
      )
    ) {
      errors.password =
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number';
    }
    if (input.password !== input.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(input);
    setErrors(errors);
    setSubmitted(true);

    if (
      Object.keys(errors).length === 0 &&
      input.userName &&
      input.email &&
      input.password &&
      input.confirmPassword
    ) {
      const updatedInput = {
        userName: input.userName,
        email: input.email,
        password: input.password,
      };
      dispatch(postUsers(updatedInput))
      .then((response) => {
        console.log("register",response);
        if (response) {
          // Respuesta exitosa
          setShowConfirmation(true);
          setInput({
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          setSubmitted(false);
          setErrors({});
          dispatch(
            showNotification(
              `Welcome ${updatedInput.userName}, Please check your email inbox or spam folder`
            )
          );
          if (!showAlert) {
            navigate('/login');
          }
          dispatch(setIsLoggedIn(true));
        } else {
          // Respuesta de error
          setShowAlert(true);
          if (response && response.error) {
            dispatch(showNotification(response.error.message));
          } else {
            dispatch(showNotification('An error occurred during registration'));
          }
        }
      })
      .catch((error) => {
        setShowAlert(true);
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;
          dispatch(showNotification(errorMessage));
        } else {
          dispatch(showNotification('An error occurred during registration'));
        }
        console.log(error);
      });
      
    }
  }

  return (
    <div className={styles['login-container']}>
      {/* <div className={styles['landing-text']}>
        <div className={styles['landing-title']}>
          <h2>Welcome to Henry Art Gallery!</h2>
        </div>
        <p>
          Discover a world of artistic inspiration and talent at HenryArt Gallery, a premier platform dedicated to showcasing emerging artists.
          <br />
          <br />
          Our mission is to provide a space where artists can share their work, connect with fellow creatives, and find endless inspiration.
        </p>
      </div> */}
      <Container className='w-100 bg-primary rounded shadow'>
        {/* Background */}
        <Row className={`${styles['bg-box']} align-items-stretch`}>
          <Col className='d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded'></Col>
          {/*  */}

          <Col className='bg-white p-3 p-md-5 rounded-end'>
            <div className='logo-box text-center'>
              {/* <Image src='./img/logo.jpg' id='logo' width='100' alt='' /> */}
            </div>
            <h2 className='fw-bold text-center py-3 py-md-5'>
              Create an Account
            </h2>
            <div className='register'>
              <Form id='register' onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='userName'>Username:</Form.Label>
                  <Form.Control
                    type='text'
                    name='userName'
                    value={input.userName}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Enter a user'
                  />
                  {errors.userName && (
                    <p className={styles.error}>{errors.userName}</p>
                  )}
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='email'>Email:</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={input.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Enter an email'
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email}</p>
                  )}
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='password'>Password:</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={input.password}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Enter a password'
                  />
                  {errors.password && (
                    <p className={styles.error}>{errors.password}</p>
                  )}
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='confirmPassword'>
                    Confirm Password:
                  </Form.Label>
                  <Form.Control
                    type='password'
                    name='confirmPassword'
                    value={input.confirmPassword}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Confirm your password'
                  />
                  {errors.confirmPassword && (
                    <p className={styles.error}>{errors.confirmPassword}</p>
                  )}
                </Form.Group>
                <div className='d-grid'>
                  <Button
                    variant='primary'
                    type='submit'
                    id='ingresar'
                    className='btn-sm'
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </div>
                {showConfirmation && (
                  <p className={styles.confirmation}>
                    Account created successfully!
                  </p>
                )}
                <div className='mb-3'>
                  <p className='text-danger mt-2' id='mensaje'></p>
                  {/* ERRORS */}
                  <p>
                    Already have an account?{' '}
                    <NavLink to='/login'>Log in</NavLink>
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

export default Register;
