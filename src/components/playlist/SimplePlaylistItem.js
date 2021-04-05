import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import RefreshIcon from '@material-ui/icons/Refresh';
import { PlaylistIconContainer } from '../layout/icons/IconContainer';

const SimplePlaylistItem = ({ id, title, onClick, onRefresh, onDelete }) => (
  <ListItem id={id} key={id}>
    <ListItemText primary={title} onClick={onClick} />
    <ListItemIcon>
      <PlaylistIconContainer onClick={onDelete}>
        <RemoveCircleOutline />
      </PlaylistIconContainer>
    </ListItemIcon>
    {onRefresh && (
      <ListItemIcon>
        <PlaylistIconContainer onClick={onRefresh}>
          <RefreshIcon />
        </PlaylistIconContainer>
      </ListItemIcon>
    )}
  </ListItem>
);
export default React.memo(SimplePlaylistItem);
