import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const Track = ({
  id,
  title,
  thumbUrl,
  onClick
}) => (
  <React.Fragment key={id}>
    <ListItem onClick={onClick} id={id}>
      <ListItemAvatar>
        <Avatar src={thumbUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={title}
      />
    </ListItem>
    <Divider />
  </React.Fragment>)

export default React.memo(Track);
