import { ITEMS_IS_LOADING, PLAYLIST_IS_LOADING } from '../actions/playlist';
import {
  PLAYLISTS_IS_SHOWING,
  MIXES_IS_SHOWING,
  VISUAL_EFFECTS_TOGGLE,
  MIX_TOGGLE_CREATE,
} from '../actions/app';

export default (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case ITEMS_IS_LOADING:
      return {
        ...state,
        isItemsLoading: payload,
      };

    case MIX_TOGGLE_CREATE:
      return {
        ...state,
        mixToggleCreate: payload,
      };

    case PLAYLIST_IS_LOADING:
      return {
        ...state,
        isPlaylistLoading: payload,
      };

    case PLAYLISTS_IS_SHOWING:
      return {
        ...state,
        isPlaylistsShowing: payload,
      };

    case MIXES_IS_SHOWING:
      return {
        ...state,
        isMixesShowing: payload,
      };
    case VISUAL_EFFECTS_TOGGLE:
      return {
        ...state,
        isVisualEffectsOn: payload,
      };

    default:
      return state;
  }
};
