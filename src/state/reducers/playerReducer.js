import {
  IS_PLAYING,
  IS_MUTED,
  IS_REPEAT,
  NOW_PLAYING,
  NOW_PLAYING_PROGRESS,
  NOW_PLAYING_INDEX,
  ON_DEVICE,
  RESET_PLAYER,
  IS_REPEAT_CURRENT_SONG,
} from '../actions/player';

export default (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: payload,
      };

    case IS_MUTED:
      return {
        ...state,
        isMuted: payload,
      };

    case IS_REPEAT:
      return {
        ...state,
        isRepeat: payload,
      };

    case IS_REPEAT_CURRENT_SONG:
      return {
        ...state,
        isRepeatCurrentSong: payload,
      };

    case NOW_PLAYING:
      return {
        ...state,
        nowPlaying: payload,
      };

    case NOW_PLAYING_PROGRESS:
      return {
        ...state,
        nowPlaying: {
          ...state.nowPlaying,
          progress: payload,
        },
      };

    case NOW_PLAYING_INDEX:
      return {
        ...state,
        nowPlaying: {
          ...state.nowPlaying,
          index: payload,
        },
      };

    case RESET_PLAYER:
      return {
        isPlaying: false,
        isMuted: false,
        nowPlaying: {
          id: null,
          title: null,
          videoId: null,
          thumb: null,
          progress: null,
          index: 0,
        },
      };

    case ON_DEVICE:
      return {
        ...state,
        onDevice: payload,
      };

    default:
      return state;
  }
};
