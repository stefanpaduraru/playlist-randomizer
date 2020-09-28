export const loadStateFromStorage = () => {
  try {
    const serializedState = window.localStorage.getItem('state');
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultState;
  }
};

export const saveStateToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

export const defaultState = {
  playlists: {},
  currentSelection: null,
  app: {
    isPlaylistLoading: false,
    isItemsLoading: false,
    isPlaylistsShowing: true,
    isDynamicBackgroundOn: true,
  },
  player: {
    isPlaying: false,
    isMuted: false,
    nowPlaying: {
      id: null,
      title: null,
      videoId: null,
      thumb: null,
      progress: null,
      index: 0
    },
    onDevice: null,
    isRepeat: false
  }
}
