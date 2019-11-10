import { PLAYLISTS_IS_SHOWING } from '../actions/app';

export function playlistsIsShowing(show) {
  return {
    type: PLAYLISTS_IS_SHOWING,
    payload: show
  };
}
