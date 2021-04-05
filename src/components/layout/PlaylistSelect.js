import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import * as colors from '../../constants/colors';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      background: '#fff',
      color: colors.TEXT_DARK,
    },
  },
};

function getStyles(playlistId, selectedPlaylists, theme) {
  return {
    fontWeight:
      selectedPlaylists.indexOf(playlistId) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function PlaylistSelect({
  playlists,
  setPlaylists,
  selectedPlaylists,
  error = false,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = event => {
    setPlaylists(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-chip-label">Playlists</InputLabel>
        <Select
          fullWidth={true}
          labelId="multiple-playlists-label"
          id="multiple-playlists"
          multiple
          value={selectedPlaylists}
          onChange={v => handleChange(v)}
          input={<Input id="select-multiple-playlists" fullWidth={true} />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => {
                return <Chip key={value} label={value} className={classes.chip} />;
              })}
            </div>
          )}
          MenuProps={MenuProps}
          error={error}
        >
          {Object.values(playlists).map(playlist => (
            <MenuItem
              key={playlist.id}
              value={playlist.snippet.title || ''}
              style={getStyles(playlist.id, selectedPlaylists, theme)}
            >
              {playlist.snippet.title || ''}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={error}>
          {error ? 'Please select at least a playlist' : ''}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
