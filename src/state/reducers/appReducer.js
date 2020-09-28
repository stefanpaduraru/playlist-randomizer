import {
  ITEMS_IS_LOADING,
  PLAYLIST_IS_LOADING
} from '../actions/playlist';
import {
  PLAYLISTS_IS_SHOWING,
  DYNAMIC_BACKGROUND
} from '../actions/app';

export default (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case ITEMS_IS_LOADING:
      return {
        ...state,
        isItemsLoading: payload
      }

    case PLAYLIST_IS_LOADING:
      return {
        ...state,
        isPlaylistLoading: payload
      }

    case PLAYLISTS_IS_SHOWING:
      return {
        ...state,
        isPlaylistsShowing: payload
      }
    case DYNAMIC_BACKGROUND:
      return {
        ...state,
        isDynamicBackgroundOn: payload
      }

    default:
      return state
  }
}
