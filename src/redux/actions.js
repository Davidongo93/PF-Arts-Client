import axios from 'axios';
// -------- ARTS ---------
export const GET_ARTS = 'GET_ARTS';
export const GET_ARTS_BY_TITLE = 'GET_ARTS_BY_TITLE';
export const FILTER_BY_ARTIST = 'FILTER_BY_ARTIST';
export const POST_ART = 'POST_ART';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const DELETE_ART = 'DELETE_ART';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const GET_ARTS_BY_AUTHOR_NAME = 'GET_ARTS_BY_AUTHOR_NAME;';
export const GET_ARTS_BY_FILTERS = 'GET_ARTS_BY_FILTERS';
export const UPDATE_ARTWORK = 'UPDATE_ARTWORK';
export const GET_FAVORITES = 'GET_FAVORITES;';
// ------- USERS -----------
export const GET_USERS = 'GET_USERS';
export const POST_USERS = 'POST_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const GET_USERS_DETAIL = 'GET_USERS_DETAIL';
// -------- REVIEWS ------
export const GET_REVIEWS = 'GET_REVIEWS';
export const POST_REVIEW = 'POST_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
// -------- CARRITO ------
export const SET_CART_ITEMS = 'SET_CART';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
// -------- TRANSACCION ------
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const GET_TRANS = 'GET_TRANS';
// -------- NOTIFICACION ------
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
// -------- ADMIN ------
export const GET_ADMIN_ARTS = 'GET_ADMIN_ARTS';
export const DELETE_ADMIN = 'DELETE_ADMIN';

export const getAdminArts = () => {
  return async function (dispatch) {
    const response = await axios.get('/admin');
    return dispatch({
      type: GET_ADMIN_ARTS,
      payload: response.data,
    });
  };
};

export function deleteAdmin(artworkId, userId) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/admin/delete?artworkId=${artworkId}&&userId=${userId}`);
      dispatch({ type: DELETE_ADMIN, payload: { artworkId, userId } });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

export const getTransaction = (paypal_id) => {
  return async function (dispatch) {
    const response = await axios.get(`/transactions?paypal_id=${paypal_id}`);
    return dispatch({
      type: GET_TRANS,
      payload: response.data,
    });
  };
};

export function getAllReviews(artworkId) {
  return async function (dispatch) {
    const arts = await axios.get(`/reviews/${artworkId}`);
    dispatch({ type: GET_REVIEWS, payload: arts.data });
  };
}

export function postReview(artworkId, reviewData) {
  return async function (dispatch) {
    const token = localStorage.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`/reviews/${artworkId}`, reviewData, config);
      dispatch({ type: POST_REVIEW, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteReview(artworkId) {
  return async function (dispatch) {
    const token = localStorage.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`/reviews/delete/${artworkId}`, config);
      dispatch({ type: DELETE_REVIEW, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

export function updateReview(artworkId, reviewData) {
  console.log(artworkId);
  console.log(reviewData);
  return async function (dispatch) {
    const token = localStorage.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`/${artworkId}`, config, reviewData);
      dispatch({ type: UPDATE_REVIEW, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}
export function postTransaction(artworkIdsString, transactionData) {
  return async function (dispatch) {
    const token = localStorage.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log('actions', token);
      const response = await axios.post(`/transactions/${artworkIdsString}`, transactionData, config);
      dispatch({ type: CREATE_TRANSACTION, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}
export const showNotification = (message) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: message,
  };
};

export const hideNotification = () => {
  return {
    type: HIDE_NOTIFICATION,
  };
};

export const getAllArts = () => {
  return async function (dispatch) {
    console.log('actions Get all arts');
    const response = await axios.get('/artworks');
    return dispatch({
      type: GET_ARTS,
      payload: response.data,
    });
  };
};
export const getArtsByTitle = (title) => {
  return async function (dispatch) {
    const arts = await axios.get(`/artworks?title=${title}`);
    console.log(arts.data);
    dispatch({ type: GET_ARTS_BY_TITLE, payload: arts.data });
  };
};
export const getArtsByAuthor = (authorName) => {
  return async function (dispatch) {
    const arts = await axios.get(`/artworks?authorName=${authorName}`);
    console.log(arts.data);
    dispatch({ type: GET_ARTS_BY_AUTHOR_NAME, payload: arts.data });
  };
};
export const getAllUsers = () => {
  return async function (dispatch) {
    const response = await axios.get(`/users`);
    return dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  };
};
export const filterByArtist = (payload) => {
  return { type: FILTER_BY_ARTIST, payload };
};

export function postArts(payload) {
  return async function (dispatch) {
    const token = localStorage.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log('actions', token);
      const response = await axios.post(`/artworks`, payload, config);
      dispatch({ type: POST_ART, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}
export function postUsers(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/users`, payload);
      dispatch({ type: POST_USERS, payload: response.data });
      console.log('actions', response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

export const checkAuthentication = () => {
  //Autenticación para usar carrito.
  return async function (dispatch) {
    try {
      const response = await axios.get(`/users`);
      dispatch({ type: CHECK_AUTHENTICATION, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: item,
  };
};

export const removeFromCart = (artworkId) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: artworkId,
  };
};

export function clearCart() {
  return { type: CLEAR_CART };
}

export const updateUser = (updatedUser) => {
  console.log(updatedUser);
  const token = localStorage.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/edit`, updatedUser, config);
      dispatch({ type: UPDATE_USER, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};

export const setLoggedUser = (user) => {
  return {
    type: SET_LOGGED_USER,
    payload: user,
  };
};

export const setIsLoggedIn = (isLoggedIn) => {
  return (dispatch) => {
    if (!isLoggedIn) {
      localStorage.removeItem('cartItems'); // Eliminar el contenido del localStorage
    }
    dispatch({
      type: SET_IS_LOGGED_IN,
      payload: isLoggedIn,
    });
  };
};

export const getUserDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/users/detail/${id}`);
      return dispatch({
        type: GET_USERS_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// Acción para agregar un favorito
export function addFavorite(userId, artworkId, payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/favorites/${userId}/${artworkId}`, payload);
      dispatch({ type: ADD_FAVORITE, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

// para mostrar los favoritos
export const getFavorites = (userId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/favorites/${userId}`);
      dispatch({ type: GET_FAVORITES, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};
export function deleteFavorite(userId, artworkId, payload) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/favorites/delete/${userId}/${artworkId}`, payload);
      dispatch({ type: DELETE_FAVORITE, payload: response.data });

      return response;
    } catch (error) {
      console.error(error);
    }
  };
}
export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/artworks/detail/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export function clearDetail() {
  return { type: CLEAR_DETAIL };
}
export const getArtsByFilters = (minPrice, maxPrice, order, category, orderType) => {
  return async function (dispatch) {
    console.log(`Filters received: minPrice=${minPrice}, maxPrice=${maxPrice}, order=${order}, category=${category}, orderType=${orderType}`);
    try {
      const params = {};
      if (minPrice) {
        params.minPrice = minPrice;
      }
      if (maxPrice) {
        params.maxPrice = maxPrice;
      }
      if (order) {
        params.order = order;
      }
      if (category) {
        params.category = category;
      }
      if (orderType) {
        params.orderType = orderType;
      }
      const response = await axios.get(`/artworks/db`, { params });
      dispatch({ type: GET_ARTS_BY_FILTERS, payload: response.data.rows });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateArtwork = (id, updatedArtwork) => {
  const token = localStorage.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(token);

  return async function (dispatch) {
    try {
      const response = await axios.put(`/artworks/edit/${id}`, updatedArtwork, config);
      dispatch({ type: UPDATE_ARTWORK, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};

export function setCartItems(cartItems) {
  return { type: SET_CART_ITEMS, payload: cartItems };
}

export function deleteArt(id) {
  const token = localStorage.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(token);

  return async function (dispatch) {
    try {
      const response = await axios.delete(`/artworks/delete/${id}`, config);
      dispatch({ type: DELETE_ART, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}
