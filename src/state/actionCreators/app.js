import {
  PLAYLISTS_IS_SHOWING,
  DYNAMIC_BACKGROUND,
} from '../actions/app';

export function playlistsIsShowing(show) {
  return {
    type: PLAYLISTS_IS_SHOWING,
    payload: show
  };
}

export function toggleBackground(toggle) {
  return {
    type: DYNAMIC_BACKGROUND,
    payload: toggle
  };
}
