import {
  PLAYLISTS_IS_SHOWING,
  VISUAL_EFFECTS_TOGGLE,
  MIXES_IS_SHOWING,
  MIX_TOGGLE_CREATE,
} from '../actions/app';

export function playlistsIsShowing(show) {
  return {
    type: PLAYLISTS_IS_SHOWING,
    payload: show,
  };
}

export function mixesIsShowing(show) {
  return {
    type: MIXES_IS_SHOWING,
    payload: show,
  };
}

export function mixToggleCreate(toggle) {
  return {
    type: MIX_TOGGLE_CREATE,
    payload: toggle,
  };
}

export function toggleVisualEffects(toggle) {
  return {
    type: VISUAL_EFFECTS_TOGGLE,
    payload: toggle,
  };
}
