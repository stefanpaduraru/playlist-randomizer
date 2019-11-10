import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchPlaylist,
  loadPlaylistData,
  resetCurrentSelection,
  loadPlaylistItems
} from '../state/actionCreators/playlist';
import { resetPlayer } from '../state/actionCreators/player';
import { playlistsIsShowing } from '../state/actionCreators/app';
import PlaylistItem from '../components/playlist/PlaylistItem';
import SearchBar from '../components/playlist/SearchBar';
import { TEXT_PRIMARY } from '../constants/colors';
import { trackPageView, trackEvent } from '../helpers/analytics';
import setRandomBg from '../helpers/layout/bg';
import { styled } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUrl = this.setUrl.bind(this);
    setRandomBg();
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
        : { 'id': null, 'snippet': null, 'items': [] }

      if (!reload) {
        loadPlaylistData(data);
        setTimeout(() => loadItemsData(data.items), 50);
      }
      trackEvent('playlist', 'load', id);
    }
  }

  handleSubmit(e) {
    const { url } = this.state;

    if (!url.length) {
      return;
    }

    const playlistId = this.getPlaylistIdFromURL(url);
    const { getPlaylist } = this.props;

    if (!playlistId) {
      return;
    }

    trackEvent('playlist', 'fetch', playlistId);
    this.navigateToPlaylist(playlistId, true);
    getPlaylist(playlistId, true);
  }

  getPlaylistIdFromURL(url) {
    // eslint-disable-next-line
    const expURL = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|playlist\?list=)([^#\&\?]*).*/
    let match = url.match(expURL);

    if (match && match[1]) {
      return match[1] || false;
    } else {
      const expID = /^\w{6}_?-?\w{10,18}_?-?\w{10,18}$/
      match = url.match(expID);

      if (match) {
        return match[0];
      }
      return false;
    }
  }

  setUrl(e) {
    this.setState({ ...this.state, url: e.target.value })
  }

  render() {
    const { playlists, app, playlistsIsShowing } = this.props;
    const playlistsCount = Object.entries(playlists).length;

    return (
      <Grid container alignItems="center" spacing={1} style={{ flex: 1, justifyContent: 'center' }}>
        <WelcomeContainer
          item xs={12}
          isPlaylistsShowing={app.isPlaylistsShowing}
          playlistsCount={playlistsCount}
        >
          <Grid container>
            <Grid item xs={12}>
              <PageTitle>Welcome to Playlist Randomizer</PageTitle>
            </Grid>
            {!playlistsCount &&
            <Grid item xs={12}>
              <PageSubTitle>This tool was created to give you better randomize features than youtube does.</PageSubTitle>
            </Grid>}
          </Grid>
        </WelcomeContainer>

        <SearchBarContainer
          item
          xs={12}
          playlistsCount={playlistsCount}
        >
          <SearchBar
            submit={this.handleSubmit}
            setUrl={this.setUrl}
          />
        </SearchBarContainer>
        {playlists && playlistsCount > 0 &&
          <Grid item xs={12}>
            <h4>
              <Link
                id="playlistsToggler"
                href="#"
                variant="inherit"
                onClick={(e) => {
                  e && e.preventDefault();
                  playlistsIsShowing(!app.isPlaylistsShowing)
                }}
              >
                Your playlists ({playlistsCount})
                {!app.isPlaylistsShowing && <ArrowRightIcon style={{ verticalAlign: 'middle' }}/>}
                {!!app.isPlaylistsShowing && <ArrowDropDownIcon style={{ verticalAlign: 'middle' }}/>}
              </Link>
            </h4>

            <PlaylistContainer
              isPlaylistsShowing={app.isPlaylistsShowing}>
              {
                Object.entries(playlists).map(item => {
                  const [key, v] = item;
                  return <PlaylistItem
                    id={key}
                    key={key}
                    thumbUrl={(v.snippet.thumbnails.default && v.snippet.thumbnails.default.url) || ''}
                    onClick={() => this.navigateToPlaylist(key)}
                    title={v.snippet.title || ''}
                    publishedAt={(v.snippet.publishedAt && new Date(v.snippet.publishedAt).toDateString()) || ''}
                  />
                })
              }
            </PlaylistContainer>
          </Grid>
        }
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getPlaylist: (playlistId, shuffle) => dispatch(fetchPlaylist(playlistId, shuffle)),
  loadItemsData: (data) => dispatch(loadPlaylistItems(data)),
  loadPlaylistData: (data) => dispatch(loadPlaylistData(data)),
  playlistsIsShowing: show => dispatch(playlistsIsShowing(show)),
  resetCurrentSelection: () => dispatch(resetCurrentSelection()),
  resetPlayer: () => dispatch(resetPlayer())
})

const mapStateToProps = (state) => ({
  app: state.app,
  playlists: state.playlists
})

Dashboard.propTypes = {
  getPlaylists: PropTypes.func,
  loadItemsData: PropTypes.func,
  loadPlaylistData: PropTypes.func,
  playlistsIsShowing: PropTypes.func,
  resetCurrentSelection: PropTypes.func,
  resetPlayer: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const PageTitle = styled(Typography)({
  '&': {
    color: TEXT_PRIMARY,
    fontSize: '1.75em'
  }
});

const PageSubTitle = styled(Typography)({
  '&': {
    color: TEXT_PRIMARY,
    fontSize: '1.15em'
  }
});

const WelcomeContainer = styled(({ isPlaylistsShowing, playlistsCount, ...other }) => <Grid {...other} />)({
  marginBottom: props => !props.isPlaylistsShowing ? 64 : 0,
  height: props =>
    !props.isPlaylistsShowing
      ? !props.playlistsCount
        ? 180 : 80
    : !props.playlistsCount
      ? 180 : 0,
  overflow: 'hidden'
});

const SearchBarContainer = styled(({ playlistsCount, ...other }) => <Grid {...other} />)({
  marginBottom: props => !props.playlistsCount ? 200 : 0,
  display: 'flex'
});

const PlaylistContainer = styled(({ isPlaylistsShowing, ...other }) => <List {...other} />)({
  height: props => !props.isPlaylistsShowing ? 0 : 200,
  overflow: props => !props.isPlaylistsShowing ? 'hidden' : 'scroll',
  maxHeight: 200
});
