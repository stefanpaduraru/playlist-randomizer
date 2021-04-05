import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  nowPlaying,
  isPlaying,
  isMuted,
  isRepeat,
  isRepeatCurrentSong,
  nowPlayingProgress,
  nowPlayingIndex,
  onDevice,
  errorPlaying,
} from '../state/actionCreators/player';
import { loadPlaylist } from '../state/actionCreators/playlist';
import ControlBar from '../components/control/ControlBar';
import Track from '../components/track/Track';
import { trackPageView, trackEvent } from '../helpers/analytics';
import setRandomBg from '../helpers/layout/bg';
import shuffle from '../helpers/randomize';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import { BackIcon } from '../components/layout/icons/BackIcon';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
  videosTitle: {
    padding: 0,
    margin: 0,
    marginBottom: '5px',
    fontWeight: 800,
  },
});

export function ImageAvatar({ src }) {
  const classes = useStyles();
  return <Avatar src={src} className={classes.avatar} />;
}

export function VideosTitle({ children }) {
  const classes = useStyles();
  return <Typography className={classes.videosTitle}>{children}</Typography>;
}

class Playlist extends React.Component {
  changeBackground() {
    const { app } = this.props;
    if (app.isVisualEffectsOn) {
      setRandomBg();
    }
  }

  playVideo(item, index) {
    const { nowPlaying, isPlaying } = this.props;

    nowPlaying({
      id: item.id,
      title: item.snippet.title,
      videoId: item.contentDetails.videoId,
      thumb: item.snippet.thumbnails.default ? item.snippet.thumbnails.default.url : '',
      progress: 0,
      index: index,
    });
    isPlaying(true);
    this.scrollToVideo(item.id);
    trackEvent('video', 'play', item.contentDetails.videoId);
    this.changeBackground();
  }

  playVideoByIndex(index) {
    const { playlist, nowPlaying, isPlaying } = this.props;
    const nextVideo = playlist.items[index] || false;

    nowPlaying({
      id: nextVideo.id,
      title: nextVideo.snippet.title,
      videoId: nextVideo.contentDetails.videoId,
      thumb: nextVideo.snippet.thumbnails.default
        ? nextVideo.snippet.thumbnails.default.url
        : '',
      progress: 0,
      index: index,
    });
    isPlaying(true);
    this.scrollToVideo(nextVideo.id);
    trackEvent('video', 'play', nextVideo.contentDetails.videoId);
    this.changeBackground();
  }

  playNext() {
    const { player, playlist, loadPlaylistData, nowPlaying, isPlaying } = this.props;

    if (
      playlist.items &&
      playlist.items.length === player.nowPlaying.index + 1 &&
      player.isRepeat
    ) {
      loadPlaylistData({ ...playlist, items: shuffle(playlist.items || []) });
      this.playVideoByIndex(0);
    } else {
      const nextVideo =
        playlist.items && playlist.items.length
          ? playlist.items[player.nowPlaying.index + 1]
          : false;

      if (nextVideo) {
        nowPlaying({
          id: nextVideo.id,
          title: nextVideo.snippet.title,
          videoId: nextVideo.contentDetails.videoId,
          thumb:
            nextVideo.snippet.thumbnails && nextVideo.snippet.thumbnails.default
              ? nextVideo.snippet.thumbnails.default.url
              : '',
          progress: 0,
          index: player.nowPlaying.index + 1,
        });
        isPlaying(true);
        this.scrollToVideo(nextVideo.id);
        trackEvent('video', 'play', nextVideo.contentDetails.videoId);
        this.changeBackground();
      }
    }
  }

  playPrevious() {
    const { player, playlist, nowPlaying, isPlaying } = this.props;
    const prevVideo = playlist.items[player.nowPlaying.index - 1] || false;

    if (prevVideo) {
      nowPlaying({
        id: prevVideo.id,
        title: prevVideo.snippet.title,
        videoId: prevVideo.contentDetails.videoId,
        thumb: prevVideo.snippet.thumbnails.default
          ? prevVideo.snippet.thumbnails.default.url
          : '',
        progress: 0,
        index: player.nowPlaying.index - 1,
      });
      isPlaying(true);
      this.scrollToVideo(prevVideo.id);
      trackEvent('video', 'play', prevVideo.contentDetails.videoId);
      this.changeBackground();
    }
  }

  togglePlayPause() {
    const { player, isPlaying } = this.props;
    isPlaying(!player.isPlaying);
  }

  playbackError(e) {
    const { errorPlaying } = this.props;
    errorPlaying();
    this.playNext();
  }

  playbackEnded() {
    const { player } = this.props;
    if (!player.isRepeatCurrentSong) {
      this.playNext();
    }
  }

  playbackStarted() {
    const { isPlaying } = this.props;
    isPlaying(true);
  }

  playbackPaused() {
    const { isPlaying } = this.props;
    isPlaying(false);
  }

  playbackProgress(progress) {
    const { nowPlayingProgress } = this.props;
    nowPlayingProgress(progress.playedSeconds);
  }

  toggleRepeat() {
    const { player, isRepeat, isRepeatCurrentSong } = this.props;
    if (player.isRepeatCurrentSong) {
      isRepeatCurrentSong(false);
      isRepeat(false);
    } else {
      if (!player.isRepeat) {
        isRepeat(true);
      } else {
        isRepeatCurrentSong(true);
        isRepeat(false);
      }
    }
  }

  shufflePlaylist() {
    const { playlist, loadPlaylistData } = this.props;
    loadPlaylistData({ ...playlist, items: shuffle(playlist.items || []) });

    trackEvent('playlist', 'load', playlist.id);
    this.playVideoByIndex(0);
  }

  scrollToVideo(id) {
    const item = document.getElementsByTagName('li')[id];
    item && item.scrollIntoView();
  }

  constructor(props) {
    super(props);
    this.playbackEnded = this.playbackEnded.bind(this);
    this.playbackError = this.playbackError.bind(this);
    this.playbackStarted = this.playbackStarted.bind(this);
    this.playbackPaused = this.playbackPaused.bind(this);
    this.playbackProgress = this.playbackProgress.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrevious = this.playPrevious.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.toggleRepeat = this.toggleRepeat.bind(this);
    this.shufflePlaylist = this.shufflePlaylist.bind(this);

    this.changeBackground();
    trackPageView();
  }

  render() {
    const { player, playlist, app } = this.props;

    if (!playlist || !playlist.id) {
      return (
        <div>
          <h3>
            Could not load playlist.
            <BackIcon />
          </h3>
        </div>
      );
    }
    const { snippet, items } = playlist;
    items &&
      items.length &&
      !player.isPlaying &&
      !player.nowPlaying.id &&
      this.playVideoByIndex(0);

    return (
      <React.Fragment>
        <Grid container justify="flex-start" alignItems="center" spacing={0}>
          <Grid item style={{ marginLeft: '20px' }}>
            {app.isVisualEffectsOn && (
              <ImageAvatar
                src={
                  snippet && snippet.thumbnails
                    ? snippet.thumbnails.medium.url
                      ? snippet.thumbnails.medium.url
                      : snippet.thumbnails.default.url
                    : ''
                }
              />
            )}
          </Grid>
          <Grid item>
            <h2 style={{ margin: '0px 10px 0px', padding: 0 }}>
              &nbsp;{snippet ? snippet.title : ''}
            </h2>
            <ControlBar
              playNext={this.playNext}
              playPrevious={this.playPrevious}
              togglePlayPause={this.togglePlayPause}
              isPlaying={player.isPlaying}
              toggleRepeat={this.toggleRepeat}
              shuffle={this.shufflePlaylist}
              repeat={player.isRepeat}
              repeatCurrentSong={player.isRepeatCurrentSong}
              muted={player.isMuted}
            />
          </Grid>
        </Grid>

        <Card
          elevation={1}
          style={{ background: 'rgba(255, 255, 255, 0.1', marginTop: 15 }}
        >
          <CardContent style={{ height: 'calc(100vh - 300px)' }}>
            <Grid
              container
              justify="flex-start"
              spacing={1}
              style={{ position: 'relative', height: '100%' }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                style={{ position: 'relative', height: '100%' }}
              >
                {
                  <>
                    <VideosTitle>
                      Videos:&nbsp;
                      {!app.isItemsLoading &&
                        items &&
                        `(${player.nowPlaying.index + 1}/${items.length})`}
                    </VideosTitle>
                    <>
                      {app.isItemsLoading && items && (
                        <React.Fragment>
                          &nbsp;
                          <CircularProgress size={14} />
                        </React.Fragment>
                      )}
                    </>
                  </>
                }
                {!app.isItemsLoading && items && items.length > 0 && (
                  <List
                    style={{
                      position: 'relative',
                      height: 'calc(100% - 29px)',
                      overflow: 'auto',
                    }}
                  >
                    {items.map((item, i) => (
                      <Track
                        key={i}
                        skey={i}
                        video={item}
                        selected={player.nowPlaying.id === item.id}
                        playVideo={this.playVideo}
                        visualEffectsEnabled={app.isVisualEffectsOn}
                      />
                    ))}
                  </List>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                {!app.isItemsLoading && player.nowPlaying && (
                  <ReactPlayer
                    style={{ margin: '29px auto 0px auto' }}
                    controls={true}
                    width={'800'}
                    height={'calc(100% - 29px)'}
                    playing={player.isPlaying}
                    url={
                      (player.nowPlaying.videoId &&
                        `https://www.youtube.com/watch?v=${player.nowPlaying.videoId}`) ||
                      ''
                    }
                    onEnded={this.playbackEnded}
                    onStart={this.playbackStarted}
                    onPause={this.playbackPaused}
                    onPlay={this.playbackStarted}
                    onError={this.playbackError}
                    loop={player.isRepeatCurrentSong}
                    // onProgress={this.playbackProgress}
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.object,
  player: PropTypes.object,
  app: PropTypes.object,
  loadPlaylistData: PropTypes.func,
  nowPlaying: PropTypes.func,
  isPlaying: PropTypes.func,
  isMuted: PropTypes.func,
  isRepeat: PropTypes.func,
  isRepeatCurrentSong: PropTypes.func,
  nowPlayingProgress: PropTypes.func,
  nowPlayingIndex: PropTypes.func,
  onDevice: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  loadPlaylistData: data => dispatch(loadPlaylist(data)),
  nowPlaying: data => dispatch(nowPlaying(data)),
  isPlaying: data => dispatch(isPlaying(data)),
  isMuted: data => dispatch(isMuted(data)),
  isRepeat: data => dispatch(isRepeat(data)),
  isRepeatCurrentSong: data => dispatch(isRepeatCurrentSong(data)),
  nowPlayingProgress: data => dispatch(nowPlayingProgress(data)),
  nowPlayingIndex: data => dispatch(nowPlayingIndex(data)),
  onDevice: data => dispatch(onDevice(data)),
  errorPlaying: () => dispatch(errorPlaying()),
});

const mapStateToProps = state => ({
  playlist: state.currentSelection,
  playlists: state.playlists,
  app: state.app,
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
