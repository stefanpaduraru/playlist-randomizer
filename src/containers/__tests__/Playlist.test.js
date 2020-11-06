import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Playlist from '../../containers/Playlist';
import { defaultState } from '../../helpers/localStorage';
import testPlaylist from '../../constants/testplaylist';

const mockStore = configureStore([]);

describe('Playlist', () => {
  let defaultStore;
  let contentStore;
  let contentComponent;

  beforeEach(() => {
    defaultStore = mockStore({
      ...defaultState,
    });

    contentStore = mockStore({
      ...defaultState,
      currentSelection: {
        ...testPlaylist,
      },
      playlists: {
        PLnUPn_O5yC812Eo29oGft8D9tzSKAv4q1: {
          ...testPlaylist,
        },
      },
    });
    defaultStore.dispatch = jest.fn();
    contentStore.dispatch = jest.fn();

    contentComponent = renderer.create(
      <Provider store={contentStore}>
        <Playlist />
      </Provider>,
    );
  });

  it('should render with content state', () => {
    expect(contentComponent.toJSON()).toMatchSnapshot();
  });
});
