import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import loggerMiddleware from './middleware/logger';
import title from './middleware/title';
import monitorReducerEnhancer from './enhancers/monitorReducer';
import { loadStateFromStorage, saveStateToStorage } from '../helpers/localStorage';

export default function configureStore() {
  const middlewareEnhancer = applyMiddleware(title, loggerMiddleware, thunkMiddleware);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers = composeEnhancers(middlewareEnhancer, monitorReducerEnhancer);
  const persistedState = loadStateFromStorage();
  const store = createStore(rootReducer, persistedState, composedEnhancers);

  store.subscribe(() => {
    saveStateToStorage({
      ...store.getState(),
    });
  });

  return store;
}
