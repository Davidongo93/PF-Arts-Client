// import loader from '../../assets/img/loader.gif';
import logo from '../../assets/img/art-gallery-logo.png';

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles['loaderContainer']}>
      <img className={styles['loader']} src={logo} alt='Loading' />
    </div>
  );
};

export default Loader;
