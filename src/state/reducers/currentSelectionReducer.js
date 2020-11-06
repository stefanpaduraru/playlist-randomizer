import {
  PLAYLIST_FETCH_DATA_SUCCESS,
  PLAYLIST_ITEMS_FETCH_DATA_SUCCESS,
  PLAYLIST_ITEMS_FETCH_DATA_SUCCESS_SHUFFLE,
  PLAYLIST_LOAD_ITEMS_DATA,
  PLAYLIST_LOAD_DATA,
  PLAYLIST_RESET,
} from '../actions/playlist';
import shuffle from '../../helpers/randomize';

export default (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case PLAYLIST_FETCH_DATA_SUCCESS:
      return {
        ...payload,
      };

    case PLAYLIST_LOAD_DATA:
      return {
        ...payload,
        items: [],
      };

    case PLAYLIST_LOAD_ITEMS_DATA:
      return {
        ...state,
        items: [].concat(shuffle(payload)),
      };

    case PLAYLIST_ITEMS_FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: [].concat(state.items || [], payload.items),
      };

    case PLAYLIST_ITEMS_FETCH_DATA_SUCCESS_SHUFFLE:
      return {
        ...state,
        items: [].concat(state.items || [], shuffle(payload.items)),
      };
    case PLAYLIST_RESET:
      return {
        id: null,
        snippet: null,
        items: [],
      };

    default:
      return state;
  }
};
