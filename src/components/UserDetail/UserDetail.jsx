import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getAllArts, updateUser } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { FaTwitterSquare, FaFacebookSquare, FaInstagramSquare, FaPencilAlt, FaMapMarkerAlt, FaEnvelope, FaMobileAlt } from 'react-icons/fa';
import CarruselUsers from '../CarruselUsers/CarruselUsers';
import style from './UserDetail.module.css';

const UserDetail = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers); // usuario
  const artworkId = useSelector((state) => state.allArts); // obras
  const userDetail = allUsers.find((user) => user.userId === userId); // datos del usuario
  const filteredArtworks = artworkId.filter((artwork) => artwork.userId === userId); // obras del usuario
  const [enabledUserEdit, setEnabledUserEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const storedUserJSON = localStorage.getItem('user');
  const storedUser = JSON.parse(storedUserJSON);
  console.log(storedUser);

  const [editedData, setEditedData] = useState({
    // Estado local para editar datos personales.
    ...storedUser,
    name: userDetail?.userName || '',
    description: userDetail?.description || '',
    phoneNumber: userDetail?.phoneNumber || '',
    location: userDetail?.location || '',
    fb: userDetail?.fb || '',
    tw: userDetail?.tw || '',
    ig: userDetail?.ig || '',
  });

  const enableEdit = () => {
    if (storedUser) {
      const storedUserId = storedUser.userId;

      // Comparar storedUserId con el userId recibido por los parámetros
      if (storedUserId === userId) {
        // Realizar acciones en caso de que sean iguales
        setEnabledUserEdit(true);
      } else {
        // Realizar acciones en caso de que no sean iguales
        setEnabledUserEdit(false);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Llama a la acción updateUser y pasa los datos actualizados
      console.log(editedData);
      dispatch(updateUser(editedData));
      // localStorage.setItem('user', JSON.stringify(editedData));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllArts());
    enableEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId]);

  // Necesita 4 obras para completar el carrusel:
  const artworksNeeded = 4 - filteredArtworks.length;
  //Si no completa le agrega una img en color gris:
  const grayImages = Array.from({ length: artworksNeeded }, (_, index) => ({
    image: `https://via.placeholder.com/300x200/808080?text=Artwork+${index + 1}`,
    title: `Artwork ${index + 1}`,
  }));
  // Combina las obras del usuario con la img en gris si es necesario:
  const combinedArtworks = [...filteredArtworks, ...grayImages];
  // Muestra el carrusel solo si el usuario tiene al menos una obra:
  const showCarousel = combinedArtworks.length > 0;

  //enlaces para las redes
  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      // eslint-disable-next-line no-undef
      window.location.href
    )}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };
  const handleInstagramShare = () => {
    const url = `https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={style['containerUserDetail']}>
      <div className={style['userDetail']}>
        <div className={style['positionPhoto']}>{userDetail?.profilePicture && <img src={userDetail.profilePicture} alt='img' className={style['photoPerfil']} />}</div>
        <div className={style['details']}>
          <div className={style['username']}>
            {isEditing ? <input className={style.inputName} placeholder='Username' type='text' value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} /> : <span className={style['username-text']}>{userDetail?.userName || '-'}</span>}
            <span>
              {isEditing ? (
                <>
                  <div className={style['editBs']}>
                    <button className={style.updateButtonSave} onClick={handleSave}>
                      Save
                    </button>
                    <button className={style.updateButtonCancel} onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                enabledUserEdit && (
                  <button className={style.editButton} onClick={handleEdit}>
                    <FaPencilAlt className={style.updateIcon} />
                  </button>
                )
              )}
            </span>
          </div>

          <div>
            <FaEnvelope className={style['iconEmail']} /> <span className={style['email-text']}>{userDetail?.email || '-'}</span> <FaMapMarkerAlt className={style['iconLocation']} /> <span className={style['location']}>{isEditing ? <input className={style.inputName} placeholder='Location' type='text' value={editedData.location} onChange={(e) => setEditedData({ ...editedData, location: e.target.value })} /> : <span className={style['location-text']}>{userDetail?.location || '-'}</span>}</span>
          </div>

          <div className={style['phone']}>
            <FaMobileAlt className={style['iconPhone']} /> {isEditing ? <input className={style.inputName} placeholder='Phone number' type='text' value={editedData.phoneNumber} onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })} /> : <span className={style['phone-text']}>{userDetail?.phoneNumber || '-'}</span>}
          </div>
          <div className={style['bio']}>{isEditing ? <textarea className={style.inputBio} placeholder='Tell us about yourself' value={editedData.description} onChange={(e) => setEditedData({ ...editedData, description: e.target.value })} /> : <p className={style['bio-text']}>{userDetail?.description || '-'}</p>}</div>
        </div>

        <div className={style['socialIcons']}>
          <FaTwitterSquare className={style['shareIcon']} style={{ color: '#55acee' }} onClick={handleTwitterShare} />
          <FaFacebookSquare className={style['shareIcon']} style={{ color: '#3b5998' }} onClick={handleFacebookShare} />
          <FaInstagramSquare className={style['shareIcon']} style={{ color: '#3374FF' }} onClick={handleInstagramShare} />
        </div>
      </div>

      {showCarousel && <CarruselUsers images={combinedArtworks.map((artwork) => artwork.image)} />}
    </div>
  );
};

export default UserDetail;
