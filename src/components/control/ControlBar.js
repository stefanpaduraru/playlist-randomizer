import React from 'react';
import ControlButton from './ControlButton';
import Grid from '@material-ui/core/Grid';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

export default function ControlBar({
  playNext,
  playPrevious,
  togglePlayPause,
  isPlaying,
  toggleRepeat,
  repeat,
  repeatCurrentSong,
  shuffle,
}) {
  const repeatTooltip = repeatCurrentSong
    ? 'Repeat current song is on'
    : repeat
    ? 'Repeat is on'
    : 'Repeat is off';

  return (
    <Grid container justify="flex-start" alignItems="center" spacing={0}>
      <ControlButton
        tooltip="Previous track"
        icon={<SkipPreviousIcon />}
        click={playPrevious}
      />
      <ControlButton
        tooltip={isPlaying ? 'Pause' : 'Play'}
        active={isPlaying}
        icon={isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
        click={togglePlayPause}
      />
      <ControlButton tooltip="Next track" icon={<SkipNextIcon />} click={playNext} />
      <ControlButton
        tooltip="Reshuffle playlist"
        icon={<ShuffleIcon />}
        click={shuffle}
      />
      <ControlButton
        tooltip={repeatTooltip}
        active={repeat || repeatCurrentSong}
        icon={repeatCurrentSong ? <RepeatOneIcon /> : <RepeatIcon />}
        click={toggleRepeat}
      />
    </Grid>
  );
}
