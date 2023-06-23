import { NavLink } from 'react-router-dom';
import style from './A-Servicies.module.css';

const AdvisoryServices = () => {
  return (
    <div className={style['A-serviciesStyle']}>
      <div className={style['textContainer']}>
        <NavLink className={style['BttBack']} to='/'>
          {' '}
          ← BACK{' '}
        </NavLink>
        <hr />
        <br />

        <h2>Advisory Services</h2>
        <br />
        <br />
        <p>
          HENRY ART GALLERY © is a vibrant hub where art thrives
          and masterpieces find new homes. Whether you're an artist looking to
          showcase your work or an art enthusiast seeking visual inspiration,
          Arte&Pinturas has you covered. With a user-friendly platform, artists
          can create profiles, exhibit their artwork, and connect with potential
          buyers. The virtual gallery offers a diverse range of paintings, from
          classical to contemporary, allowing art lovers to explore different
          styles and techniques. With detailed descriptions and high-quality
          images, buyers can make informed decisions while enjoying a secure
          purchasing process. Stay updated on art events and exhibitions to
          fully immerse yourself in the captivating world of art.
        </p>
        <p>
          We believe in the transformative power of art and are dedicated to
          helping you discover your own masterpiece. In addition, our Advisory
          Services Department provides comprehensive business solutions to meet
          your needs. Our experienced team offers strategic guidance and
          assistance to help you achieve your goals. Explore our range of
          services and reach out to us for more information.
        </p>
        {/* { servicios de asesoramiento */}
      </div>
      {/* <img className={style['imgS']} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC1loMMxJ9DTEL8PaCxuMcdjr0ROz9jG8B0Q&usqp=CAU'/> */}
    </div>
  );
};

export default AdvisoryServices;
