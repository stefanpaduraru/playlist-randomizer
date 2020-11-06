import React from 'react';
import { LI_HOVER } from '../../constants/colors';
import { styled } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SimpleTrack = ({ skey, video, selected, playVideo }) => (
  <StyledListItem
    onClick={() => playVideo(video, skey)}
    selected={selected}
    id={(video && video.id) || null}
    data-key={skey}
    key={skey}
  >
    <ListItemText primary={(!!video && !!video.snippet && video.snippet.title) || null} />
  </StyledListItem>
);

export default React.memo(SimpleTrack);

const StyledListItem = styled(ListItem)({
  cursor: 'pointer',
  '&.Mui-selected, &.Mui-selected:hover, &:hover': {
    backgroundColor: LI_HOVER,
  },
});
