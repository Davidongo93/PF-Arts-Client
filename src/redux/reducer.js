/* eslint-disable no-case-declarations */
import { GET_ARTS, GET_ARTS_BY_TITLE, GET_ARTS_BY_AUTHOR_NAME, GET_USERS, SET_IS_LOGGED_IN, POST_ART, ADD_FAVORITE, DELETE_FAVORITE, GET_DETAIL, CLEAR_DETAIL, GET_ARTS_BY_FILTERS, POST_USERS, DELETE_ART, UPDATE_USER, UPDATE_ARTWORK, GET_FAVORITES, GET_USERS_DETAIL, SET_CART_ITEMS, ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SET_LOGGED_USER, CHECK_AUTHENTICATION, SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './actions';

const initialState = {
  notificationVisible: false,
  notificationMessage: '',
  allArts: [],
  allUsers: [], //almacena todos los usuarios.
  filteredArts: [],
  arts: [],
  myFavorites: [],
  detail: {},
  users: [], //almacena datos de usuarios individuales.
  usersdetail: [],
  cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  loggedUser: {},
  isLoggedIn: false,

  auth: {
    isAuthenticated: false,
    cartItems: [],
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notificationVisible: false,
      };
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notificationVisible: true,
        notificationMessage: action.payload,
      };
    case GET_ARTS:
      return {
        ...state,
        allArts: action.payload,
      };

    case GET_ARTS_BY_TITLE:
      return {
        ...state,
        allArts: action.payload,
      };

    case GET_ARTS_BY_AUTHOR_NAME:
      return {
        ...state,
        allArts: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case GET_USERS_DETAIL:
      return {
        ...state,
        usersdetail: action.payload,
      };

    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case ADD_FAVORITE:
      return {
        ...state,
        myFavorites: action.payload,
      };

    case GET_FAVORITES:
      return {
        ...state,
        myFavorites: action.payload,
      };

    case DELETE_FAVORITE:
      return {
        ...state,
        myFavorites: state.myFavorites.filter((fav) => fav.artworkId !== action.payload),
      };

    case SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: action.payload,
      };

    case POST_ART:
      return {
        ...state,
        arts: [...state.arts, action.payload],
      };

    case POST_USERS:
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
      };

    case UPDATE_USER:
      const updatedUser = action.payload;
      const updatedUsers = state.allUsers.map((user) => {
        if (user.userId === updatedUser.userId) {
          return updatedUser;
        }
        return user;
      });

      return {
        ...state,
        allUsers: updatedUsers,
        users: updatedUsers,
      };

    case UPDATE_ARTWORK:
      const updatedArtwork = action.payload;
      const updatedArts = state.detail;

      if (updatedArtwork.id === updatedArts.id) {
        return {
          ...state,
          detail: updatedArtwork,
        };
      }

      return {
        ...state,
        arts: updatedArts,
      };

    case DELETE_ART:
      return {
        ...state,
        arts: state.arts.filter((art) => art.id !== action.payload),
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        detail: {},
      };

    case GET_ARTS_BY_FILTERS:
      return {
        ...state,
        allArts: action.payload,
      };

    case SET_CART_ITEMS:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      console.log('Removing from cart:', action.payload.artworkId);
      return {
        ...state,
        cart: state.cart.filter((item) => item.artworkId !== action.payload.artworkId),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case CHECK_AUTHENTICATION:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: action.payload,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
