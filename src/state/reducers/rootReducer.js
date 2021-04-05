import { combineReducers } from 'redux';
import playlistsReducer from './playlistsReducer';
import mixesReducer from './mixesReducer';
import currentSelectionReducer from './currentSelectionReducer';
import appReducer from './appReducer';
import playerReducer from './playerReducer';

export default combineReducers({
  playlists: playlistsReducer,
  mixes: mixesReducer,
  currentSelection: currentSelectionReducer,
  app: appReducer,
  player: playerReducer,
});
