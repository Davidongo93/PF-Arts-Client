import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faTrash,
  faCheck,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import styles from './cart.module.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      dispatch(setCartItems(JSON.parse(storedCartItems)));
    }
  }, [dispatch]);

  const handleRemoveCartItem = (artworkId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.artworkId !== artworkId
    );
    dispatch(setCartItems(updatedCartItems));
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return (
        <div
          className='card text-center'
          style={{
            marginTop: '190px',
            marginLeft: '400px',
            marginRight: '400px',
            marginBottom: '186px',
          }}
        >
          <div className='card-body'>
            <h5 className='card-title'>Your cart is empty.</h5>
            <p className='card-text'>
              Start adding items to your cart to make a purchase.
            </p>
            <Link to='/' className={styles.buttonShopping}>
              <FontAwesomeIcon icon={faArrowLeft} className='mr-2' /> Continue
              Shopping
            </Link>
          </div>
        </div>
      );
    }
    if (cartItems.length > 4) {
      const limitedCartItems = cartItems.slice(0, 4);
      return (
        <div className='card text-center'>
          <div className='card-body'>
            <h5 className='card-title'>You can only purchase up to 4 items.</h5>
            <div className='d-flex justify-content-center'>
              {limitedCartItems.map((item) => (
                <div
                  className='card mx-2'
                  key={item.artworkId}
                  style={{ width: '18rem' }}
                >
                  <img
                    src={item.image}
                    className={`card-img-top ${styles.cardImage}`}
                    alt={item.title}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{item.title}</h5>
                    <p className='card-text'>Price: {item.price} USD</p>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveCartItem(item.artworkId)}
                    >
                      <FontAwesomeIcon icon={faTrash} className='mr-2' /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className='d-flex justify-content-center'
        style={{ marginTop: '34px' }}
      >
        {cartItems.map((item) => (
          <div
            className='card mx-2'
            key={item.artworkId}
            style={{ width: '15rem' }}
          >
            <img
              src={item.image}
              className={`card-img-top ${styles.cardImage}`}
              alt={item.title}
            />
            <div className='card-body'>
              <h5 className='card-title'>{item.title}</h5>
              <p className='card-text'>
                <FontAwesomeIcon icon={faDollarSign} /> Price: {item.price} USD
              </p>
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveCartItem(item.artworkId)}
              >
                <FontAwesomeIcon icon={faTrash} className='mr-2' /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderCartItems()}
      {cartItems.length > 0 && (
        <div className={styles.container}>
          <Link to='/' className={styles.buttonShopping}>
            <FontAwesomeIcon icon={faArrowLeft} className='mr-2' /> Continue
            Shopping
          </Link>
          <Link to='/checkout' className={styles.buttonCheckout}>
            <FontAwesomeIcon icon={faCheck} className='mr-2' /> Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
