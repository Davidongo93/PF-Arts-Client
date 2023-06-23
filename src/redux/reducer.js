import {
  GET_ARTS,
  GET_ARTS_BY_TITLE,
  GET_ARTS_BY_AUTHOR_NAME,
  GET_USERS,
  POST_ART,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  GET_DETAIL,
  CLEAR_DETAIL,
  GET_ARTS_BY_FILTERS,
  POST_USERS,
  DELETE_ART,
  UPDATE_USER,
  GET_FAVORITES//
} from './actions';

const initialState = {
  allArts: [],
  allUsers: [], //almacena todos los usuarios.
  filteredArts: [],
  arts: [],
  myFavorites: [],
  detail: {},
  users: [], //almacena datos de usuarios individuales.
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
    
    case GET_FAVORITES://para mostrar los favorites
      return {
        ...state,
        myFavorites: action.payload,
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

    case ADD_FAVORITE:
      return {
        ...state,
        myFavorites: [...state.myFavorites, action.payload],
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

    case DELETE_FAVORITE:
      return {
        ...state,
        myFavorites: state.myFavorites.filter(
          (fav) => fav.id !== action.payload
        ),
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

    default:
      return state;
  }
};

export default rootReducer;
