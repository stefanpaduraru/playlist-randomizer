import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '../../containers/Dashboard';
import { defaultState } from '../../helpers/localStorage';
import { playlistsIsShowing } from '../../state/actionCreators/app';
import { resetPlayer } from '../../state/actionCreators/player';
import {
  resetCurrentSelection,
  loadPlaylistData,
} from '../../state/actionCreators/playlist';
import testPlaylist from '../../constants/testplaylist';

const mockStore = configureStore([]);

describe('Dashboard', () => {
  let defaultStore;
  let contentStore;
  let defaultComponent;
  let contentComponent;

  beforeEach(() => {
    defaultStore = mockStore(defaultState);
    defaultStore.dispatch = jest.fn();

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
    contentStore.dispatch = jest.fn();

    defaultComponent = renderer.create(
      <Provider store={defaultStore}>
        <Dashboard />
      </Provider>,
    );

    contentComponent = renderer.create(
      <Provider store={contentStore}>
        <Dashboard />
      </Provider>,
    );
  });

  it('should render with default state', () => {
    expect(defaultComponent.toJSON()).toMatchSnapshot();
  });

  it('should reset current selection', () => {
    renderer.act(() => {
      expect(contentStore.dispatch).toHaveBeenCalledWith(resetCurrentSelection());
    });
  });

  it('should reset player', () => {
    renderer.act(() => {
      expect(contentStore.dispatch).toHaveBeenCalledWith(resetPlayer());
    });
  });

  it('should render with content state', () => {
    expect(contentComponent.toJSON()).toMatchSnapshot();
  });

  it('should hide playlists on <a> click', () => {
    renderer.act(() => {
      contentComponent.root
        .findByProps({
          className:
            'MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary',
        })
        .props.onClick();

      expect(contentStore.dispatch).toHaveBeenCalledWith(playlistsIsShowing(false));
    });
  });

  it('should load playlist data', () => {
    renderer.act(() => {
      contentComponent.root
        .findByProps({
          id: 'PLnUPn_O5yC812Eo29oGft8D9tzSKAv4q1',
        })
        .props.onClick();

      expect(contentStore.dispatch).toHaveBeenCalledWith(
        loadPlaylistData({ ...testPlaylist }),
      );
    });
  });
});
