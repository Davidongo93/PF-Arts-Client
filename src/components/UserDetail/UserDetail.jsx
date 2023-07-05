import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getAllArts, updateUser } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaPencilAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaMobileAlt,
  FaImage,
} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import CarruselUsers from '../CarruselUsers/CarruselUsers';
import style from './UserDetail.module.css';

const UserDetail = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers); // usuario
  const artworkId = useSelector((state) => state.allArts); // obras
  const userDetail = allUsers.find((user) => user.userId === userId); // datos del usuario
  const filteredArtworks = artworkId.filter(
    (artwork) => artwork.userId === userId
  ); // obras del usuario
  const [enabledUserEdit, setEnabledUserEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const storedUserJSON = localStorage.getItem('user');
  const storedUser = JSON.parse(storedUserJSON);
  console.log(storedUser);

  const [editedData, setEditedData] = useState({
    // Estado local para editar datos personales.
    ...storedUser,
    userName: userDetail?.userName || '',
    description: userDetail?.description || '',
    phoneNumber: userDetail?.phoneNumber || '',
    location: userDetail?.location || '',
    fb: userDetail?.fb || '',
    tw: userDetail?.tw || '',
    ig: userDetail?.ig || '',
    profilePicture: userDetail?.profilePicture || '',
  });

  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [editedSocialData, setEditedSocialData] = useState({
    fb: userDetail?.fb || '',
    tw: userDetail?.tw || '',
    ig: userDetail?.ig || '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

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
    setShowFileInput(true);
  };

  const handleEditSocial = () => {
    setIsEditingSocial(true);
  };

  const handleSave = async () => {
    try {
      // Crea un objeto FormData para enviar los datos
      const formData = new FormData();
      formData.append('profilePicture', selectedFile); // Agrega el archivo al formData

      // Agrega los demás datos actualizados al formData
      Object.entries(editedData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Llama a la acción updateUser y pasa el formData como parámetro
      dispatch(updateUser({ userId, ...editedSocialData, formData }));
      localStorage.setItem('user', JSON.stringify(editedData));
      setIsEditing(false);
      setEditedData({ ...editedData, ...editedSocialData });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSaveSocial = () => {
    // Realiza las acciones necesarias para guardar los datos actualizados
    dispatch(updateUser({ userId, ...editedSocialData }));
    setIsEditingSocial(false);
  };

  const handleSocialInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSocialData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleCancelSocial = () => {
    setIsEditingSocial(false);
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
    image: `https://via.placeholder.com/300x200/D5D1D1?text=Artwork+${
      index + 1
    }`,
    title: `Artwork ${index + 1}`,
  }));
  // Combina las obras del usuario con la img en gris si es necesario:
  const combinedArtworks = [...filteredArtworks, ...grayImages];
  // Muestra el carrusel solo si el usuario tiene al menos una obra:
  const showCarousel = combinedArtworks.length > 0;

  //enlaces para las redes
  const handleTwitterClick = () => {
    if (userDetail?.tw) {
      window.open(userDetail.tw, '_blank');
    }
  };

  const handleFacebookClick = () => {
    if (userDetail?.fb) {
      window.open(userDetail.fb, '_blank');
    }
  };

  const handleInstagramClick = () => {
    if (userDetail?.ig) {
      window.open(userDetail.ig, '_blank');
    }
  };

  return (
    <div className={style['containerUserDetail']}>
      <div className={style['userDetail']}>
        <div className={style['positionPhoto']}>
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt='img'
              className={style['photoPerfil']}
            />
          ) : (
            userDetail?.profilePicture && (
              <img
                src={userDetail.profilePicture}
                alt='img'
                className={style['photoPerfil']}
              />
            )
          )}
        </div>
        <div className={style['details']}>
          <div className={style['username']}>
            {isEditing ? (
              <input
                className={style.inputUserName}
                placeholder='Username'
                type='text'
                value={editedData.userName}
                onChange={(e) =>
                  setEditedData({ ...editedData, userName: e.target.value })
                }
              />
            ) : (
              <span className={style['username-text']}>
                {userDetail?.userName || '-'}
              </span>
            )}
            <span>
              {isEditing ? (
                <>
                  <div className={style['editBs']}>
                    <button
                      className={style.updateButtonSave}
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className={style.updateButtonCancel}
                      onClick={handleCancel}
                    >
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
            <FaEnvelope className={style['iconEmail']} />{' '}
            <span className={style['email-text']}>
              {userDetail?.email || '-'}
            </span>{' '}
            <FaMapMarkerAlt className={style['iconLocation']} />{' '}
            <span className={style['location']}>
              {isEditing ? (
                <input
                  className={style.inputName}
                  placeholder='Location'
                  type='text'
                  value={editedData.location}
                  onChange={(e) =>
                    setEditedData({ ...editedData, location: e.target.value })
                  }
                />
              ) : (
                <span className={style['location-text']}>
                  {userDetail?.location || '-'}
                </span>
              )}
            </span>
          </div>

          <div className={style['phone']}>
            <FaMobileAlt className={style['iconPhone']} />{' '}
            {isEditing ? (
              <input
                className={style.inputName}
                placeholder='Phone number'
                type='number'
                value={editedData.phoneNumber}
                onChange={(e) =>
                  setEditedData({ ...editedData, phoneNumber: e.target.value })
                }
              />
            ) : (
              <span className={style['phone-text']}>
                {userDetail?.phoneNumber || '-'}
              </span>
            )}
          </div>
          <div className={style['bio']}>
            {isEditing ? (
              <textarea
                className={style.inputBio}
                placeholder='Tell us about yourself'
                value={editedData.description}
                onChange={(e) =>
                  setEditedData({ ...editedData, description: e.target.value })
                }
              />
            ) : (
              <p className={style['bio-text']}>
                {userDetail?.description || '-'}
              </p>
            )}
          </div>
          {isEditing && (
            <div>
              <label htmlFor='fileInput' className={style.selectFileButton}>
                <FaImage className={`${style.icon} icon`} /> Upload profile
                picture
              </label>
              <input
                id='fileInput'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className={style.fileInput}
              />
            </div>
          )}
        </div>

        <div className={style['socialIcons']}>
          {isEditingSocial ? (
            <>
              <input
                className={style.inputSocial}
                type='text'
                name='fb'
                placeholder='Facebook'
                value={editedSocialData.fb}
                onChange={handleSocialInputChange}
              />
              <input
                className={style.inputSocial}
                type='text'
                name='tw'
                placeholder='Twitter'
                value={editedSocialData.tw}
                onChange={handleSocialInputChange}
              />
              <input
                className={style.inputSocial}
                type='text'
                name='ig'
                placeholder='Instagram'
                value={editedSocialData.ig}
                onChange={handleSocialInputChange}
              />
              <button
                className={style.updateSocialButtonSave}
                onClick={handleSaveSocial}
              >
                Save
              </button>
              <button
                className={style.updateSocialButtonCancel}
                onClick={handleCancelSocial}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <FaTwitterSquare
                className={style['shareIcon']}
                style={{ color: '#55acee' }}
                onClick={handleTwitterClick}
              />
              <FaFacebookSquare
                className={style['shareIcon']}
                style={{ color: '#3b5998' }}
                onClick={handleFacebookClick}
              />
              <FaInstagramSquare
                className={style['shareIcon']}
                style={{ color: '#3374FF' }}
                onClick={handleInstagramClick}
              />
              {enabledUserEdit && (
                <button className={style.editButton} onClick={handleEditSocial}>
                  <FontAwesomeIcon icon={faCog} className={style.updateIcon} />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {showCarousel && (
        <CarruselUsers
          images={combinedArtworks.map((artwork) => artwork.image)}
        />
      )}
    </div>
  );
};

export default UserDetail;
