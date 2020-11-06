import {
  IS_PLAYING,
  IS_MUTED,
  IS_REPEAT,
  IS_REPEAT_CURRENT_SONG,
  NOW_PLAYING,
  NOW_PLAYING_PROGRESS,
  NOW_PLAYING_INDEX,
  ON_DEVICE,
  RESET_PLAYER,
  PLAYBACK_ERROR,
} from '../actions/player';

export function isPlaying(playing) {
  return {
    type: IS_PLAYING,
    payload: playing,
  };
}

export function isMuted(muted) {
  return {
    type: IS_MUTED,
    payload: muted,
  };
}

export function isRepeat(repeat) {
  return {
    type: IS_REPEAT,
    payload: repeat,
  };
}

export function isRepeatCurrentSong(repeat) {
  return {
    type: IS_REPEAT_CURRENT_SONG,
    payload: repeat,
  };
}

export function nowPlaying(nowPlaying) {
  return {
    type: NOW_PLAYING,
    payload: nowPlaying,
  };
}

export function nowPlayingProgress(progress) {
  return {
    type: NOW_PLAYING_PROGRESS,
    payload: progress,
  };
}

export function nowPlayingIndex(index) {
  return {
    type: NOW_PLAYING_INDEX,
    payload: index,
  };
}

export function onDevice(device) {
  return {
    type: ON_DEVICE,
    payload: device,
  };
}

export function resetPlayer() {
  return {
    type: RESET_PLAYER,
  };
}

export function errorPlaying() {
  return {
    type: PLAYBACK_ERROR,
  };
}
