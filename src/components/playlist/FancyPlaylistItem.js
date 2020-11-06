import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import RefreshIcon from '@material-ui/icons/Refresh';
import { PlaylistIconContainer } from '../layout/icons/IconContainer';

const FancyPlaylistItem = ({ id, title, thumbUrl, onClick, onRefresh, onDelete }) => (
  <React.Fragment key={id}>
    <ListItem>
      <ListItemAvatar onClick={onClick} id={id}>
        <Avatar src={thumbUrl} />
      </ListItemAvatar>
      <ListItemText primary={title} onClick={onClick} id={id} />
      <ListItemIcon>
        <PlaylistIconContainer onClick={onDelete}>
          <RemoveCircleOutline />
        </PlaylistIconContainer>
      </ListItemIcon>
      <ListItemIcon>
        <PlaylistIconContainer onClick={onRefresh}>
          <RefreshIcon />
        </PlaylistIconContainer>
      </ListItemIcon>
    </ListItem>
    <Divider />
  </React.Fragment>
);

export default React.memo(FancyPlaylistItem);
