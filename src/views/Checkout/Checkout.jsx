import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faUndo,
  faCertificate,
  faGlobe,
  faLock,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { clearCart, postTransaction } from '../../redux/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadScript } from '@paypal/paypal-js';
import styles from './checkout.module.css';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const dispatch = useDispatch();
  let paypal;

  const artworkIds = cartItems.map((item) => item.artworkId);
  const artworkIdsString = artworkIds.join(',');

  const renderCheckoutItems = () => {
    if (cartItems.length === 0 || paymentApproved) {
      return <p>Your cart is empty.</p>;
    }

    return (
      <ul className={styles.checkoutList}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.checkoutItem}>
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.title} className={styles.image} />
            </div>
            <div className={styles.itemDetails}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemPrice}>Price: {item.price} USD</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (accumulator, item) => accumulator + parseFloat(item.price),
      0
    );
    return total.toFixed(2);
  };

  useEffect(() => {
    const initializePayPal = async () => {
      try {
        paypal = await loadScript({
          clientId:
            'AR7Htz5PEZkht1GZRgG-IjedcAkciDgEHHRk1gLEcbnlWGmKIrUWyIBoRUmEXjhmdPj26nJL0MY5CmGR',
        });

        paypal
          .Buttons({
            locale: 'en_US',
            createOrder: function (data, actions) {
              const total = cartItems.reduce(
                (accumulator, item) => accumulator + parseFloat(item.price),
                0
              );
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total.toFixed(2),
                    },
                  },
                ],
              });
            },
            onApprove: function (data, actions) {
              return actions.order.capture().then(function (cart) {
                // Mensaje de compra exitosa
                const transactionData = {
                  paypal_id: cart.id,
                  purchase_value: cart.purchase_units[0].amount.value,
                  status: cart.status,
                };
                toast.success(
                  'Successful purchase! Thank you for your purchase.'
                );
                setPaymentApproved(true);
                // Actualizar el estado en cart, queda en 0.
                dispatch(postTransaction(artworkIdsString, transactionData));
                dispatch(clearCart());
              });
            },
          })
          .render('#paypal-button-container');
      } catch (error) {
        console.error('Failed to load the PayPal JS SDK script', error);
      }
    };
    initializePayPal();
  }, []);

  return (
    <div
      className={`${styles.row} row g-0 text-center`}
      style={{ height: '100%' }}
    >
      <div className='col-sm-6 col-md-8' style={{ width: '650px' }}>
        <h2 className={styles.checkoutTitle}>Checkout</h2>
        <div className={styles.separator}></div>
        {renderCheckoutItems()}
        <p className={styles.boldText}>SHIPPING COSTS included</p>
        <p>
          <span className={styles.total}>Total:</span> {calculateTotal()} USD
        </p>
        <div className={styles.separator}></div>
        <Link to='/cart' className={styles.buttonShopping}>
          <FontAwesomeIcon icon={faArrowLeft} className='mr-2' /> Back to Cart
        </Link>
      </div>

      <div
        className='col-6 col-md-4'
        style={{
          marginTop: '40px',
          marginRight: '35px',
        }}
      >
        <div className={styles.infoBox}>
          <p>
            <FontAwesomeIcon icon={faTruck} className={styles.icon} />{' '}
            Professional delivery between 7 to 10 days
          </p>
          <p>
            <FontAwesomeIcon icon={faGlobe} className={styles.icon} />{' '}
            International delivery
          </p>
          <p>
            <FontAwesomeIcon icon={faLock} className={styles.icon} /> Secure
            payment
          </p>
          <p>
            <FontAwesomeIcon icon={faUndo} className={styles.icon} /> Free
            returns 14 days after delivery
          </p>
          <p>
            <FontAwesomeIcon icon={faCertificate} className={styles.icon} />{' '}
            Original piece with certificate of authenticity
          </p>
        </div>
        <div className={styles.separator}></div>
        <div id='your-container-element'></div>
        <div id='paypal-button-container'></div>{' '}
        {/* Contenedor para el botón de PayPal */}
      </div>
    </div>
  );
};

export default Checkout;
