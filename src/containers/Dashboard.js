import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchPlaylist,
  loadPlaylistData,
  resetCurrentSelection,
  loadPlaylistItems,
  removePlaylist,
} from '../state/actionCreators/playlist';
import { resetPlayer } from '../state/actionCreators/player';
import {
  playlistsIsShowing,
  mixesIsShowing,
  mixToggleCreate,
} from '../state/actionCreators/app';
import { createMix, removeMix } from '../state/actionCreators/mixes';
import PlaylistItem from '../components/playlist/PlaylistItem';
import SearchBar from '../components/SearchBar';
import MixItem from '../components/playlist/MixItem';

import { TEXT_PRIMARY } from '../constants/colors';
import { trackPageView, trackEvent } from '../helpers/analytics';
import setRandomBg from '../helpers/layout/bg';
import { Button, styled } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TransitionModal from '../components/layout/Modal';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.startCreateMix = this.startCreateMix.bind(this);
    this.mixSubmit = this.mixSubmit.bind(this);

    const { app } = this.props;
    if (app.isVisualEffectsOn) {
      setRandomBg();
    }
    trackPageView();
  }

  componentDidMount() {
    const { resetCurrentSelection, resetPlayer } = this.props;

    resetCurrentSelection();
    resetPlayer();
  }

  navigateToPlaylist(id, reload = false) {
    const { playlists, loadPlaylistData, loadItemsData, history } = this.props;

    if (id) {
      history && history.push('/' + id);
      const data = playlists
        ? { ...playlists[`${id}`] }
        : { id: null, snippet: null, items: [] };

      if (!reload) {
        loadPlaylistData(data);
        setTimeout(() => loadItemsData(data.items || []), 50);
      } else {
        fetchPlaylist(id);
      }
      trackEvent('playlist', 'load', id);
    }
  }

  deleteMix(id) {
    const { removeMix } = this.props;
    removeMix(id);
  }

  navigateToMix(id) {
    const { mixes, playlists, loadPlaylistData, loadItemsData, history } = this.props;

    if (id) {
      history && history.push('/mix_' + id);
      const mix = mixes ? { ...mixes[`${id}`] } : { items: [] };
      const items = mix.items.reduce((acc, val) => {
        const playlist = playlists[`${val}`];
        if (playlist && playlist.items) {
          acc.push(...playlist.items);
        }
        return acc;
      }, []);

      loadPlaylistData({ id, snippet: { title: id } });
      setTimeout(() => loadItemsData(items || []), 50);
      trackEvent('mix', 'load');
    }
  }

  startCreateMix() {
    const { mixesIsShowing, mixToggleCreate } = this.props;
    mixesIsShowing(true);
    mixToggleCreate(true);
  }

  mixSubmit(name, playlists) {
    const { mixToggleCreate, createMix } = this.props;
    mixToggleCreate(false);
    createMix(name, playlists);
  }

  deletePlaylist(id) {
    const { removePlaylist } = this.props;

    if (id) {
      resetCurrentSelection();
      resetPlayer();
      removePlaylist(id);
      trackEvent('playlist', 'remove', id);
    }
  }

  getPlaylistTitle(playlist) {
    return playlist?.snippet?.title || 'Unknown title';
  }

  getPlaylistThumbUrl(playlist) {
    return playlist?.snippet?.thumbnails?.default?.url || '';
  }

  handleSubmit(e) {
    const { url } = this.state;

    if (!url.length) {
      return;
    }

    const playlistId = this.getPlaylistIdFromURL(url);
    if (!playlistId) {
      return;
    }

    this.fetchPlaylistAndTrack(playlistId);
  }

  fetchPlaylistAndTrack(playlistId) {
    const { getPlaylist } = this.props;

    trackEvent('playlist', 'fetch', playlistId);
    this.navigateToPlaylist(playlistId, true);
    getPlaylist(playlistId, true);
  }

  getPlaylistIdFromURL(url) {
    // eslint-disable-next-line
    const expURL = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|playlist\?list=)([^#\&\?]*).*/;
    let match = url.match(expURL);

    if (match && match[1]) {
      return match[1] || false;
    } else {
      const expID = /^\w{6}_?-?\w{10,18}_?-?\w{10,18}$/;
      match = url.match(expID);

      if (match) {
        return match[0];
      }
      return false;
    }
  }

  setUrl(e) {
    this.setState({ ...this.state, url: e.target.value });
  }

  render() {
    const {
      playlists,
      mixes,
      app,
      playlistsIsShowing,
      mixesIsShowing,
      mixToggleCreate,
    } = this.props;
    const playlistsCount = Object.entries(playlists).length;
    const mixesCount = Object.entries(mixes).length;

    return (
      <Grid
        container
        alignItems="center"
        spacing={1}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <TransitionModal
          isOpen={app.mixToggleCreate}
          playlists={playlists}
          onClose={() => {
            mixToggleCreate(false);
          }}
          onSubmit={this.mixSubmit}
        />
        <WelcomeContainer
          item
          xs={12}
          isPlaylistsShowing={app.isPlaylistsShowing}
          playlistsCount={playlistsCount}
        >
          <Grid container>
            <Grid item xs={12}>
              <PageTitle>Welcome to Playlist Randomizer</PageTitle>
            </Grid>
            {!playlistsCount && (
              <Grid item xs={12}>
                <PageSubTitle>
                  This tool was created to give you better randomize features than Youtube
                  does.
                </PageSubTitle>
                <PageSubTitleSecondary>
                  Example playlist id: PLnUPn_O5yC812Eo29oGft8D9tzSKAv4q1
                </PageSubTitleSecondary>
              </Grid>
            )}
          </Grid>
        </WelcomeContainer>

        <SearchBarContainer item xs={12} playlistsCount={playlistsCount}>
          <SearchBar submit={this.handleSubmit} setUrl={this.setUrl} />
        </SearchBarContainer>

        {playlists && playlistsCount > 0 && (
          <Grid item xs={12}>
            <h4>
              <Link
                id="playlistsToggler"
                href="#"
                variant="inherit"
                onClick={e => {
                  e && e.preventDefault();
                  playlistsIsShowing(!app.isPlaylistsShowing);
                }}
              >
                Your playlists ({playlistsCount})
                {!app.isPlaylistsShowing && (
                  <ArrowRightIcon style={{ verticalAlign: 'middle' }} />
                )}
                {!!app.isPlaylistsShowing && (
                  <ArrowDropDownIcon style={{ verticalAlign: 'middle' }} />
                )}
              </Link>
            </h4>

            <PlaylistContainer isPlaylistsShowing={app.isPlaylistsShowing}>
              {Object.entries(playlists).map(item => {
                const [key, v] = item;

                return (
                  <PlaylistItem
                    id={key}
                    key={key}
                    title={this.getPlaylistTitle(v)}
                    thumbUrl={this.getPlaylistThumbUrl(v)}
                    visualEffectsEnabled={app.isVisualEffectsOn}
                    onClick={() => this.navigateToPlaylist(key)}
                    onDelete={() => this.deletePlaylist(key)}
                    onRefresh={() => this.fetchPlaylistAndTrack(key)}
                  />
                );
              })}
            </PlaylistContainer>

            <h4>
              <Link
                id="mixesToggler"
                href="#"
                variant="inherit"
                onClick={e => {
                  e && e.preventDefault();
                  mixesIsShowing(!app.isMixesShowing);
                }}
              >
                Your mixes ({mixesCount})
                {!app.isMixesShowing && (
                  <ArrowRightIcon style={{ verticalAlign: 'middle' }} />
                )}
                {!!app.isMixesShowing && (
                  <ArrowDropDownIcon style={{ verticalAlign: 'middle' }} />
                )}
              </Link>
              <Button
                variant="text"
                color="primary"
                onClick={e => {
                  e && e.preventDefault();
                  this.startCreateMix();
                }}
              >
                Create Mix
              </Button>
            </h4>

            <MixesContainer isMixesShowing={app.isMixesShowing}>
              {Object.entries(mixes).map(item => {
                const [key] = item;

                return (
                  <MixItem
                    name={key}
                    key={key}
                    onClick={() => this.navigateToMix(key)}
                    onDelete={() => this.deleteMix(key)}
                  />
                );
              })}
            </MixesContainer>
          </Grid>
        )}
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPlaylist: (playlistId, shuffle) => dispatch(fetchPlaylist(playlistId, shuffle)),
  loadItemsData: data => dispatch(loadPlaylistItems(data)),
  loadPlaylistData: data => dispatch(loadPlaylistData(data)),
  playlistsIsShowing: show => dispatch(playlistsIsShowing(show)),
  mixesIsShowing: show => dispatch(mixesIsShowing(show)),
  mixToggleCreate: show => dispatch(mixToggleCreate(show)),
  createMix: (mixName, playlists) => dispatch(createMix(mixName, playlists)),
  removeMix: mixName => dispatch(removeMix(mixName)),
  resetCurrentSelection: () => dispatch(resetCurrentSelection()),
  resetPlayer: () => dispatch(resetPlayer()),
  removePlaylist: id => dispatch(removePlaylist(id)),
});

const mapStateToProps = state => ({
  app: state.app,
  playlists: state.playlists,
  mixes: state.mixes,
});

Dashboard.propTypes = {
  getPlaylists: PropTypes.func,
  loadItemsData: PropTypes.func,
  loadPlaylistData: PropTypes.func,
  playlistsIsShowing: PropTypes.func,
  mixesIsShowing: PropTypes.func,
  mixStartCreate: PropTypes.func,
  createMix: PropTypes.func,
  removeMix: PropTypes.func,
  resetCurrentSelection: PropTypes.func,
  resetPlayer: PropTypes.func,
  removePlaylist: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const PageTitle = styled(Typography)({
  '&': {
    color: TEXT_PRIMARY,
    fontSize: '1.75em',
  },
});

const PageSubTitle = styled(Typography)({
  '&': {
    color: TEXT_PRIMARY,
    fontSize: '1.15em',
  },
});

const PageSubTitleSecondary = styled(Typography)({
  '&': {
    color: '#afafaf',
    fontSize: '0.95em',
  },
});

const WelcomeContainer = styled(({ isPlaylistsShowing, playlistsCount, ...other }) => (
  <Grid {...other} />
))({
  marginBottom: props => (!props.isPlaylistsShowing ? 64 : 0),
  height: props =>
    !props.isPlaylistsShowing
      ? !props.playlistsCount
        ? 180
        : 80
      : !props.playlistsCount
      ? 180
      : 0,
  overflow: 'hidden',
});

const SearchBarContainer = styled(({ playlistsCount, ...other }) => <Grid {...other} />)({
  marginBottom: props => (!props.playlistsCount ? 200 : 0),
  display: 'flex',
});

const PlaylistContainer = styled(({ isPlaylistsShowing, ...other }) => (
  <List {...other} />
))({
  height: props => (!props.isPlaylistsShowing ? 0 : 200),
  overflow: props => (!props.isPlaylistsShowing ? 'hidden' : 'auto'),
  maxHeight: 200,
});

const MixesContainer = styled(({ isMixesShowing, ...other }) => <List {...other} />)({
  height: props => (!props.isMixesShowing ? 0 : 200),
  overflow: props => (!props.isMixesShowing ? 'hidden' : 'auto'),
  maxHeight: 200,
});
