import { combineReducers } from 'redux';
import playlistsReducer from './playlistsReducer';
import currentSelectionReducer from './currentSelectionReducer';
import appReducer from './appReducer';
import playerReducer from './playerReducer';

export default combineReducers({
  playlists: playlistsReducer,
  currentSelection: currentSelectionReducer,
  app: appReducer,
  player: playerReducer,
});
