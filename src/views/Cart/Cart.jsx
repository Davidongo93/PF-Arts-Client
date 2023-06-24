import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faUndo,
  faCertificate,
  faGlobe,
  faLock,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadScript } from '@paypal/paypal-js';
import { clearDetail } from '../../redux/actions';
import styles from './Cart.module.css';

//Poner json web token para almacenar carrito
const Checkout = () => {
  const [showDetail, setShowDetail] = useState(true);
  const selectedArtwork = useSelector((state) => state.detail);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let paypal;

  const removeArtworkFromCart = () => {
    // Lógica para eliminar el artículo del carrito
    // Me falta despachar una acción de Redux para actualizar el estado del carrito
    // Por ejemplo: dispatch(removeArtwork(selectedArtwork.id));
    setShowDetail(false);
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
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedArtwork.price,
                    },
                  },
                ],
              });
            },
            onApprove: function (data, actions) {
              return actions.order.capture().then(function (details) {
                // Mensaje de compra exitosa
                toast.success(
                  'Successful purchase! Thank you for your purchase.'
                );
                // Actualizar el estado de detail en cart, queda en 0. Lo ideal es configurar stock.
                dispatch(clearDetail());
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
    <div className={styles.container}>
      {selectedArtwork && showDetail ? (
        <>
          <div className={styles.leftColumn}>
            <p>
              If you have already registered with Henry Art Gallery,{' '}
              <Link to='/login' className={styles.link}>
                Log in
              </Link>
            </p>
            <div className={styles.separator}></div>
            <h3>Your cart</h3>
            <div className={`${styles.imgContainer}`}>
              <img src={selectedArtwork.image} alt={selectedArtwork.title} />
            </div>
            <p className={styles.boldTitle}>{selectedArtwork.title}</p>
            <p>{selectedArtwork.authorName}</p>
            <p>
              {selectedArtwork.width}x{selectedArtwork.height}
            </p>
            <p>{selectedArtwork.date}</p>
            <div className={styles.separator}></div>
            <p>
              <span className={styles.boldText}>PRICE</span>{' '}
              {selectedArtwork.price} USD
            </p>
            <p>
              <span className={styles.boldText}>SHIPPING COSTS </span> included
            </p>
            <p>
              <span className={styles.boldText}>TOTAL</span>{' '}
              {selectedArtwork.price} USD
            </p>
            <div className={styles.separator}></div>
            <button
              className={styles.deleteButton}
              onClick={removeArtworkFromCart}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div className={styles.rightColumn}>
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
        </>
      ) : (
        <div className={styles.emptyCartMessage}>
          Your cart is empty!
          <Link to='/' className={styles.buyButton}>
            Buy now
          </Link>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Checkout;
