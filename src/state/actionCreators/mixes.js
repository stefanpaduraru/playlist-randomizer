import { MIX_CREATE, MIX_REMOVE } from '../actions/mixes';

export function createMix(mixName, playlists) {
  return {
    type: MIX_CREATE,
    mixName: mixName,
    payload: playlists,
  };
}

export function removeMix(mixName) {
  return {
    type: MIX_REMOVE,
    mixName: mixName,
  };
}
