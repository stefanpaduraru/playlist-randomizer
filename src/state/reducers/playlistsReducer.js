import {
  PLAYLIST_FETCH_DATA_SUCCESS,
  PLAYLIST_ITEMS_FETCH_DATA_SUCCESS,
  PLAYLIST_ITEMS_FETCH_DATA_SUCCESS_SHUFFLE,
  PLAYLIST_REMOVE,
} from '../actions/playlist';

export default (state = {}, action) => {
  const { payload, playlistId } = action;

  switch (action.type) {
    case PLAYLIST_FETCH_DATA_SUCCESS:
      return {
        ...state,
        [`${payload.id}`]: payload,
      };

    case PLAYLIST_ITEMS_FETCH_DATA_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const playlist = state[`${playlistId}`];

      return {
        ...state,
        [`${playlistId}`]: {
          id: playlist.id,
          snippet: playlist.snippet,
          items: [].concat(playlist.items || [], payload.items),
        },
      };

    case PLAYLIST_ITEMS_FETCH_DATA_SUCCESS_SHUFFLE:
      // eslint-disable-next-line no-case-declarations
      const p = state[`${playlistId}`];

      return {
        ...state,
        [`${playlistId}`]: {
          id: p.id,
          snippet: p.snippet,
          items: [].concat(p.items || [], payload.items),
        },
      };

    case PLAYLIST_REMOVE:
      const filtered = Object.keys(state).filter(key => key !== payload);

      return {
        ...filtered.reduce((playlists, key) => {
          playlists[`${key}`] = { ...state[key] };
          return playlists;
        }, {}),
      };

    default:
      return state;
  }
};
