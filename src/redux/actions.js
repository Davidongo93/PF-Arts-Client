import axios from 'axios';

const URL = 'https://pf-arts-api-production.up.railway.app';
//const URL = 'http://localhost:3001';

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
// -------- CARRITO ------
export const SET_CART_ITEMS = 'SET_CART';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
// -------- TRANSACCION ------
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
// -------- NOTIFICACION ------
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

// actions.js

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
      const response = await axios.post(
        `${URL}/transactions/${artworkIdsString}`,
        transactionData,
        config
      );
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
    const response = await axios.get(`${URL}/artworks`);
    return dispatch({
      type: GET_ARTS,
      payload: response.data,
    });
  };
};
export const getArtsByTitle = (title) => {
  return async function (dispatch) {
    const arts = await axios.get(`${URL}/artworks?title=${title}`);
    console.log(arts.data);
    dispatch({ type: GET_ARTS_BY_TITLE, payload: arts.data });
  };
};
export const getArtsByAuthor = (authorName) => {
  return async function (dispatch) {
    const arts = await axios.get(`${URL}/artworks?authorName=${authorName}`);
    console.log(arts.data);
    dispatch({ type: GET_ARTS_BY_AUTHOR_NAME, payload: arts.data });
  };
};
export const getAllUsers = () => {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/users`);
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
      const response = await axios.post(`${URL}/artworks`, payload, config);
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
      const response = await axios.post(`${URL}/users`, payload);
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
      const response = await axios.get(`${URL}/users`);
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
  const token = localStorage.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${URL}/users/edit`,
        updatedUser,
        config
      );
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
  return {
    type: SET_IS_LOGGED_IN,
    payload: isLoggedIn,
  };
};

export const getUserDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/users/detail/${id}`);
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
      const response = await axios.post(
        `${URL}/favorites/${userId}/${artworkId}`,
        payload
      );
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
      const response = await axios.get(`${URL}/favorites/${userId}`);
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
      const response = await axios.delete(
        `${URL}/favorites/delete/${userId}/${artworkId}`,
        payload
      );
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
      const response = await axios.get(`${URL}/artworks/detail/${id}`);
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
export const getArtsByFilters = (
  minPrice,
  maxPrice,
  order,
  category,
  orderType
) => {
  return async function (dispatch) {
    console.log(
      `Filters received: minPrice=${minPrice}, maxPrice=${maxPrice}, order=${order}, category=${category}, orderType=${orderType}`
    );
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
      const response = await axios.get(`${URL}/artworks/db`, { params });
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
      const response = await axios.put(
        `${URL}/artworks/edit/${id}`,
        updatedArtwork,
        config
      );
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
      const response = await axios.delete(
        `${URL}/artworks/delete/${id}`,
        config
      );
      dispatch({ type: DELETE_ART, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

// Acción para eliminar un favorito
