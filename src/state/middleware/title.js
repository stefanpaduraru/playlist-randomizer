/* eslint-disable */
import {NOW_PLAYING} from "../actions/player";
import {PLAYLIST_RESET} from "../actions/playlist";

const siteTitle = document.title;
export default store => next => action => {
  const result = next(action);
  if (action.type === NOW_PLAYING) {
    document.title = `${store.getState().player.nowPlaying.title} | ${siteTitle}`;
  } else if (action.type === PLAYLIST_RESET) {
    document.title = siteTitle;
  }
  return result;
};
