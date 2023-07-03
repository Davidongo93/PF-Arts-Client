import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CarruselUsers.module.css'; // Archivo de estilos CSS

const CarruselUsers = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 4 >= images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 4 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carruselContainer}>
      <div className={styles.gridContainer}>
        <div className={styles.div1}>
          <img className={styles.image} src={images[startIndex]} />
        </div>
        <div className={styles.div2}>
          <img className={styles.image} src={images[startIndex + 1]} />
        </div>
        <div className={styles.div3}>
          <img className={styles.image} src={images[startIndex + 2]} />
        </div>
        <div className={styles.div4}>
          <img className={styles.image} src={images[startIndex + 3]} />
        </div>
      </div>
      <button className={styles.prevButton} onClick={handlePrev}>
        {'<'}
      </button>
      <button className={styles.nextButton} onClick={handleNext}>
        {'>'}
      </button>
    </div>
  );
};

CarruselUsers.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CarruselUsers;
