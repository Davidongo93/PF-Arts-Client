import axios from 'axios';

// const URL = 'https://pf-arts-api-production.up.railway.app';
const URL = 'http://localhost:3001';

export const GET_ARTS = 'GET_ARTS';
export const GET_ARTS_BY_TITLE = 'GET_ARTS_BY_TITLE';
export const GET_USERS = 'GET_USERS';
export const FILTER_BY_ARTIST = 'FILTER_BY_ARTIST';
export const POST_ART = 'POST_ART';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const DELETE_ART = 'DELETE_ART';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const POST_USERS = 'POST_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_ARTS_BY_AUTHOR_NAME = 'GET_ARTS_BY_AUTHOR_NAME;';
export const GET_ARTS_BY_FILTERS = 'GET_ARTS_BY_FILTERS';
export const UPDATE_ARTWORK = 'UPDATE_ARTWORK';
export const GET_FAVORITES = 'GET_FAVORITES;'

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
    try {
      const response = await axios.post(`${URL}/artworks`, payload);
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
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}
export function updateUser(updatedUser) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(token);
      const response = await axios.put(`${URL}/users/edit`, updatedUser, config);
      dispatch({ type: UPDATE_USER, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}


// Acción para agregar un favorito
export function addFavorite(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post('/favorites/add', payload);
      dispatch({ type: ADD_FAVORITE, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

// Acción para eliminar un favorito
export function deleteFavorite(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/favorites/delete/${payload.id}`);
      dispatch({ type: DELETE_FAVORITE, payload: response.data });

      return response;
    } catch (error) {
      console.error(error);
    }
  };
}
//Ojo para mostrar los favoritos
export const getFavorites = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('/favorites');
      dispatch({ type: GET_FAVORITES, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};

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

export const getArtsByFilters = (century, order, created) => {
  return async function (dispatch) {
    console.log(
      `Filters received: century=${century}, order=${order}, created=${created}`
    );
    try {
      const params = {};

      if (century) {
        params.century = century;
      }

      if (order) {
        params.order = order;
      }

      if (created) {
        params.created = created;
      }

      const response = await axios.get(`${URL}/artworks/db`, { params });
      dispatch({ type: GET_ARTS_BY_FILTERS, payload: response.data.rows });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};

export function deleteArt(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`${URL}/artworks/${id}`);
      dispatch({ type: DELETE_ART, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

export const updateArtwork = (id, updatedArtwork) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`${URL}/artworks/${id}`, updatedArtwork);
      dispatch({ type: UPDATE_ARTWORK, payload: response.data });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};
