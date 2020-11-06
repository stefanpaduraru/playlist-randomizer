import { getPlaylistDataById, getPlaylistItemData } from '../../helpers/youtube';
import {
  ITEMS_IS_LOADING,
  PLAYLIST_IS_LOADING,
  PLAYLIST_FETCH_DATA_SUCCESS,
  PLAYLIST_ITEMS_FETCH_DATA_SUCCESS,
  PLAYLIST_ITEMS_FETCH_DATA_SUCCESS_SHUFFLE,
  PLAYLIST_LOAD_ITEMS_DATA,
  PLAYLIST_LOAD_DATA,
  PLAYLIST_RESET,
  ITEMS_HAS_ERRORED,
  PLAYLIST_REMOVE,
} from '../actions/playlist';

export function fetchPlaylist(playlistId, applyShuffle) {
  return dispatch => {
    dispatch(playlistIsLoading(true));
    getPlaylistDataById(playlistId)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(playlistIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(playlist => {
        dispatch(playlistFetchDataSuccess(playlist.items[0]));
        dispatch(fetchPlaylistItems(playlistId, false, applyShuffle));
      })
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function fetchPlaylistItems(
  playlistId,
  nextPageToken = false,
  applyShuffle = false,
) {
  return dispatch => {
    dispatch(itemsIsLoading(true));
    getPlaylistItemData(playlistId, nextPageToken)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        // dispatch(itemsIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(playlist => {
        if (playlist.nextPageToken) {
          dispatch(fetchPlaylistItems(playlistId, playlist.nextPageToken, applyShuffle));
        } else {
          dispatch(itemsIsLoading(false));
        }
        dispatch(itemsFetchDataSuccess(playlistId, playlist, applyShuffle));
      })
      .catch(error => {
        dispatch(itemsIsLoading(false));
        dispatch(itemsHasErrored(error));
      });
  };
}

export function loadItemsData(items) {
  return () => loadPlaylistItems(items);
}

export function itemsHasErrored(err) {
  // eslint-disable-next-line no-console
  console.log(err);
  return {
    type: ITEMS_HAS_ERRORED,
    hasErrored: true,
  };
}

export function removePlaylist(payload) {
  return {
    type: PLAYLIST_REMOVE,
    payload,
  };
}

export function loadPlaylistData(data) {
  return {
    type: PLAYLIST_LOAD_DATA,
    payload: data,
  };
}

export function loadPlaylist(data) {
  return dispatch => {
    dispatch(loadPlaylistData(data));
    dispatch(itemsIsLoading(true));
    dispatch(loadPlaylistItemsAndFinish(data.items));
  };
}

export function loadPlaylistItemsAndFinish(items) {
  return dispatch => {
    dispatch(loadPlaylistItems(items));
    dispatch(itemsIsLoading(false));
  };
}

export function loadPlaylistItems(items) {
  return {
    type: PLAYLIST_LOAD_ITEMS_DATA,
    payload: items,
  };
}

export function itemsIsLoading(payload) {
  return {
    type: ITEMS_IS_LOADING,
    payload,
  };
}

export function playlistIsLoading(payload) {
  return {
    type: PLAYLIST_IS_LOADING,
    payload,
  };
}

export function itemsFetchDataSuccess(playlistId, payload, applyShuffle) {
  if (applyShuffle) {
    return {
      type: PLAYLIST_ITEMS_FETCH_DATA_SUCCESS_SHUFFLE,
      playlistId,
      payload,
    };
  } else {
    return {
      type: PLAYLIST_ITEMS_FETCH_DATA_SUCCESS,
      playlistId,
      payload,
    };
  }
}

export function playlistFetchDataSuccess(payload) {
  return {
    type: PLAYLIST_FETCH_DATA_SUCCESS,
    payload,
  };
}

export function resetCurrentSelection() {
  return {
    type: PLAYLIST_RESET,
  };
}
