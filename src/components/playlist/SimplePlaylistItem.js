import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SimplePlaylistItem = ({
  id,
  title,
  onClick
}) => (
  <ListItem onClick={onClick} id={id} key={id}>
    <ListItemText
      primary={title}
    />
  </ListItem>
)
export default React.memo(SimplePlaylistItem);
