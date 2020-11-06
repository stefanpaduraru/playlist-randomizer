import { PLAYLISTS_IS_SHOWING, VISUAL_EFFECTS_TOGGLE } from '../actions/app';

export function playlistsIsShowing(show) {
  return {
    type: PLAYLISTS_IS_SHOWING,
    payload: show,
  };
}

export function toggleVisualEffects(toggle) {
  return {
    type: VISUAL_EFFECTS_TOGGLE,
    payload: toggle,
  };
}
