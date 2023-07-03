import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../redux/actions';
import './FloatingNotifications.css';

const FloatingNotification = () => {
  const [visible, setVisible] = useState(true);
  const [timer, setTimer] = useState(30);

  const dispatch = useDispatch();
  const notificationVisible = useSelector(state => state.notificationVisible);
  const notificationMessage = useSelector(state => state.notificationMessage);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 0.1);
    }, 100);

    const timeout = setTimeout(() => {
      setVisible(false);
      dispatch(hideNotification());
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [dispatch]);

  const handleClose = () => {
    setVisible(false);
    dispatch(hideNotification());
  };

  if (!visible || !notificationVisible) {
    return null;
  }

  return (
    <div className="floating-notification">
      <div className="notification-header">
        <div className="progress-bar" style={{ width: `${(timer / 30) * 100}%` }}></div>
        <button className="close-button" onClick={handleClose}>
          X
        </button>
      </div>
      <div className="notification-content">
        {notificationMessage && (
          <div className="notification">{notificationMessage}</div>
        )}
      </div>
    </div>
  );
};

export default FloatingNotification;
