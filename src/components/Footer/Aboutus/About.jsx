import style from './About.module.css';
import { BsLinkedin } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import imgAlex from '../../../assets/img/cat_Alex.jpg';
import imgSantyG from '../../../assets/img/dog_SanG.jpg';
import imgAni from '../../../assets/img/cat_Ana.jpg';
import imgJhon from '../../../assets/img/cat_Jhon.jpg';
import imgSantiM from '../../../assets/img/dog_SanM.jpg';
import imgDave from '../../../assets/img/cat_Dave.jpg';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className={style['about']}>
      <div className={style['txtContainer']}>
        <NavLink className={style['BttBack']} to='/'>
          {' '}
          ← BACK{' '}
        </NavLink>

        <hr />
        <br />
        <h1>Discover Our Team</h1>
        <br />
        <p>
          HENRY ART GALLERY © is a user-friendly art and painting e-commerce website using React,
          JavaScript, and SQL. The platform allows users to explore, buy, and
          sell artworks, connect with artists, and enjoy a personalized art
          experience. It features a diverse art catalog, secure transactions,
          artist profiles, personalized recommendations, advisory services, and
          additional support for framing and artwork care.
        </p>
        <p>
          We offer a diverse Art Catalog featuring a wide range of artworks
          including paintings, sculptures, and photographs. Additionally, we
          provide Consultation and Additional Services, guiding users in
          selecting art that suits their style, budget, and specific
          requirements, while offering services such as custom framing,
          decoration assistance, and expert advice on artwork care and
          preservation.
        </p>
      </div>
      <div className={style['Participantes']}>
        <div className={style['Admins']}>
          <img className={style['imgStyle']} src={imgAlex} alt='Alex' />
          <div className={style['text']}>
          <h3>Alex Robert CQ</h3>
          <p>Web Developer</p>
          <p>Full Stack</p>
          </div>
          <a
            className={style['Icons']}
            href='https://www.linkedin.com/in/alex-robert-calapuja-quispe-b35807261'
            target='_blank'
            rel='noreferrer'
          >
            <BsLinkedin />
          </a>
          <a
            className={style['Icons']}
            href='https://github.com/alexrobertCQ'
            target='_blank'
            rel='noreferrer'
          >
            <BsGithub />
          </a>
        </div>
        <div className={style['Admins']}>
          <img className={style['imgStyle']} src={imgSantyG} alt='SantyG' />
          <div className={style['text']}>
          <h3>Santy Galardi</h3>
          <p>Web Developer</p>
          <p>Full Stack</p>
          </div>
          <a
            className={style['Icons']}
            href='https://www.linkedin.com/in/santigalardi/'
            target='_blank'
            rel='noreferrer'
          >
            <BsLinkedin />
          </a>
          <a
            className={style['Icons']}
            href='https://github.com/santigalardi'
            target='_blank'
            rel='noreferrer'
          >
            <BsGithub />
          </a>
        </div>
        <div className={style['Admins']}>
          <img className={style['imgStyle']} src={imgAni} alt='Ani' />
          <div className={style['text']}>
          <h3>Anabella SimonP</h3>
          <p>Web Developer</p>
          <p>Full Stack</p>
          </div>
          <a
            className={style['Icons']}
            href='https://www.linkedin.com/in/anabellasimonpietri/'
            target='_blank'
            rel='noreferrer'
          >
            <BsLinkedin />
          </a>
          <a
            className={style['Icons']}
            href='https://github.com/AnabellaSimonpietri'
            target='_blank'
            rel='noreferrer'
          >
            <BsGithub />
          </a>
        </div>
        <div className={style['Admins']}>
          <img className={style['imgStyle']} src={imgJhon} alt='Jhon' />
          <div className={style['text']}>
          <h3>Jhon Rojas</h3>
          <p>Web developer</p>
          <p>Full Stack</p>
          </div>
          <a
            className={style['Icons']}
            href='https://www.linkedin.com/in/jhon-daniel-rojas/'
            target='_blank'
            rel='noreferrer'
          >
            <BsLinkedin />
          </a>
          <a
            className={style['Icons']}
            href='https://github.com/JhonDaniel01'
            target='_blank'
            rel='noreferrer'
          >
            <BsGithub />
          </a>
        </div>
        <div className={style['Admins']}>
          <img className={style['imgStyle']} src={imgSantiM} alt='SantiM' />
          <div className={style['text']}>
          <h3>Santi Morales</h3>
          <p>Web developer</p>
          <p>Full Stack</p>
          </div>
          <a
            className={style['Icons']}
            href='https://www.linkedin.com/in/morales-santiago/'
            target='_blank'
            rel='noreferrer'
          >
            <BsLinkedin />
          </a>
          <a
            className={style['Icons']}
            href='https://github.com/Ssamza'
            target='_blank'
            rel='noreferrer'
          >
            <BsGithub />
          </a>
        </div>
        <div className={style['Admins']}>
          <img className={style['imgStyle']} src={imgDave} alt='David' />
          <div className={style['text']}>
          <h3>David Miranda</h3>
          <p>Web developer</p>
          <p>Full Stack</p>
          </div>
          <a
            className={style['Icons']}
            href='https://www.linkedin.com/in/david-orlando-miranda-roa-7239b0264/'
            target='_blank'
            rel='noreferrer'
          >
            <BsLinkedin />
          </a>
          <a
            className={style['Icons']}
            href='https://github.com/Davidongo93'
            target='_blank'
            rel='noreferrer'
          >
            <BsGithub />
          </a>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
