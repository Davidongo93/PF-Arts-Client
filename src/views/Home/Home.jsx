import { useSelector } from 'react-redux';
// import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import styles from './Home.module.css';

const Home = () => {
  const allArts = useSelector((state) => state.allArts);
  const currentArts = allArts && Array.isArray(allArts) && allArts.slice(8, 11);
  // eslint-disable-next-line no-unused-vars
  const showCarousel = currentArts && currentArts.length > 0;

  return (
    <div className={styles.HomeContainer}>
      {/* {showCarousel && <CustomCarousel />} */}
      <CardsContainer />
    </div>
  );
};

export default Home;
