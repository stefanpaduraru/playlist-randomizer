import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PlaylistSelect from './PlaylistSelect';
import { makeStyles } from '@material-ui/core';

export default function TransitionModal({
  isOpen = false,
  playlists = {},
  onClose,
  onSubmit,
}) {
  const [mixName, setMixName] = useState('');
  const [mixPlaylists, setMixPlaylists] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [playlistsError, setPlaylistsError] = useState(false);

  const onChangeMixName = e => {
    setMixName(e.target.value);
    setNameError(!validMixName(e.target.value));
  };

  const playlistsSelected = playlists => playlists.length;
  const validMixName = name => name && name.length;

  const onChangePlaylists = useCallback(
    playlists => {
      setMixPlaylists(playlists);
      setPlaylistsError(!playlistsSelected(playlists));
    },
    [setMixPlaylists],
  );

  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    const playlistsIds = getPlaylistIds(mixPlaylists);
    if (!playlistsSelected(mixPlaylists) || !validMixName(mixName)) {
      setNameError(!validMixName(mixName));
      setPlaylistsError(!playlistsSelected(mixPlaylists));
      return;
    }
    onSubmit(mixName, playlistsIds);
    setMixName('');
    setMixPlaylists([]);
  };

  const getPlaylistIds = useCallback(
    mixPlaylists => {
      const ids = mixPlaylists.map(
        playlistName =>
          Object.values(playlists).find(
            playlist => playlistName === playlist.snippet.title,
          ).id,
      );
      return ids;
    },
    [playlists],
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: '#fffffff5',
        },
      }}
    >
      <DialogTitle className={classes.dialogTitle}>Create Mix</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Give it a name and select at least a playlist.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Mix name"
          type="text"
          fullWidth
          onChange={onChangeMixName}
          error={nameError}
          helperText={nameError ? 'Please input a valid name' : ''}
        />
        <PlaylistSelect
          playlists={playlists}
          setPlaylists={onChangePlaylists}
          selectedPlaylists={mixPlaylists}
          error={playlistsError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles(() => ({
  dialogTitle: {
    color: '#000',
  },
}));
