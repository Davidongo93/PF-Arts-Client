import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail, updateUser, setLoggedUser } from '../../redux/actions';
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
import CarruselUsers from '../../components/CarruselUsers/CarruselUsers';
import style from './UserDetail.module.css';

const UserDetail = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const userDetail = useSelector((state) => state.userDetail);
  const filteredArtworks = userDetail.artworks;
  const [enabledUserEdit, setEnabledUserEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editedData, setEditedData] = useState({
    // Estado local para editar datos personales.
    ...userDetail,
    userName: loggedUser.userName,
    profilePicture: loggedUser.profilePicture,
    description: loggedUser.description,
    phoneNumber: loggedUser.phoneNumber,
    location: loggedUser.location,
  });

  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [editedSocialData, setEditedSocialData] = useState({
    fb: loggedUser.fb || '',
    tw: loggedUser.tw || '',
    ig: loggedUser.ig || '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const loggedUserId = loggedUser.userId;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSocial = () => {
    setIsEditingSocial(true);
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    const formData = new FormData();
    formData.append('userName', editedData.userName);
    formData.append('description', editedData.description);
    formData.append('phoneNumber', editedData.phoneNumber);
    formData.append('location', editedData.location);
    formData.append('fb', editedSocialData.fb);
    formData.append('tw', editedSocialData.tw);
    formData.append('ig', editedSocialData.ig);
    formData.append('profilePicture', editedData.profilePicture);
    // Llama a la acción updateUser y pasa el objeto FormData
    dispatch(updateUser(formData))
      .then(() => dispatch(getUserDetail(userId)))
      .then(() => {
        setSelectedFile(null);
        setIsEditing(false);
        setEditedData({ ...editedData, ...editedSocialData });
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file !== null) {
      setSelectedFile(file);
      setEditedData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));
    }
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
    dispatch(getUserDetail(userId)).then(() => {
      if (loggedUserId === userId) {
        setEnabledUserEdit(true);
        localStorage.setItem('user', JSON.stringify(userDetail));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId]);

  useEffect(() => {
    if (enabledUserEdit) {
      dispatch(setLoggedUser(userDetail));
    }
  }, [enabledUserEdit, dispatch, userDetail]);

  // Necesita 4 obras para completar el carrusel:
  const artworksNeeded = 4 - filteredArtworks?.length;
  //Si no completa le agrega una img en color gris:
  const grayImages = Array.from({ length: artworksNeeded }, (_, index) => ({
    image: `https://via.placeholder.com/300x200/D5D1D1?text=Artwork+${index + 1}`,
    title: `Artwork ${index + 1}`,
  }));

  // Combina las obras del usuario con la img en gris si es necesario:
  const combinedArtworks = [...filteredArtworks, ...grayImages];
  // Muestra el carrusel solo si el usuario tiene al menos una obra:

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
      <form onSubmit={handleSave} encType='multipart/form-data'>
        <div className={style['userDetail']}>
          <div className={style['positionPhoto']}>
            {selectedFile !== null ? (
              <img src={URL.createObjectURL(selectedFile)} alt='img' className={style['photoPerfil']} />
            ) : (
              <img src={userDetail.profilePicture} alt='img' className={style['photoPerfil']} />
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
                  onChange={(e) => setEditedData({ ...userDetail, userName: e.target.value })}
                />
              ) : (
                <span className={style['username-text']}>{userDetail?.userName || '-'}</span>
              )}
              <span>
                {isEditing ? (
                  <>
                    <div className={style['editBs']}>
                      <button className={style.updateButtonSave} type='submit'>
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
              <FaEnvelope className={style['iconEmail']} />{' '}
              <span className={style['email-text']}>{userDetail?.email || '-'}</span>{' '}
              <FaMapMarkerAlt className={style['iconLocation']} />{' '}
              <span className={style['location']}>
                {isEditing ? (
                  <input
                    className={style.inputName}
                    placeholder='Location'
                    type='text'
                    value={editedData.location}
                    onChange={(e) => setEditedData({ ...userDetail, location: e.target.value })}
                  />
                ) : (
                  <span className={style['location-text']}>{userDetail?.location || '-'}</span>
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
                    setEditedData({
                      ...userDetail,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              ) : (
                <span className={style['phone-text']}>{userDetail?.phoneNumber || '-'}</span>
              )}
            </div>
            <div className={style['bio']}>
              {isEditing ? (
                <textarea
                  className={style.inputBio}
                  placeholder='Tell us about yourself'
                  value={editedData.description}
                  onChange={(e) =>
                    setEditedData({
                      ...userDetail,
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                <p className={style['bio-text']}>{userDetail?.description || '-'}</p>
              )}
            </div>
            {isEditing && (
              <div>
                <label htmlFor='fileInput' className={style.selectFileButton}>
                  <FaImage className={`${style.icon} icon`} /> Upload profile picture
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
                  name='tw'
                  placeholder='Twitter'
                  value={editedSocialData.tw}
                  onChange={handleSocialInputChange}
                />
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
                  name='ig'
                  placeholder='Instagram'
                  value={editedSocialData.ig}
                  onChange={handleSocialInputChange}
                />
                <button className={style.updateSocialButtonSave} onClick={handleSaveSocial}>
                  Save
                </button>
                <button className={style.updateSocialButtonCancel} onClick={handleCancelSocial}>
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

        {combinedArtworks && <CarruselUsers images={combinedArtworks.map((artwork) => artwork.image)} />}
      </form>
    </div>
  );
};

export default UserDetail;
