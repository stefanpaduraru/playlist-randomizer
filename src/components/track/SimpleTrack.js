import React from 'react';
import { LI_HOVER } from '../../constants/colors';
import { styled, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SimpleTrack = ({ skey, video, selected, playVideo, playlist }) => (
  <StyledListItem
    onClick={() => playVideo(video, skey)}
    selected={selected}
    id={(video && video.id) || null}
    data-key={skey}
    key={skey}
  >
    <ListItemText
      primary={
        (!!video && !!video.snippet && (
          <>
            {video.snippet.title}
            <Typography variant="caption" fontWeight="light" display="block">
              {video.snippet.videoOwnerChannelTitle}
            </Typography>
          </>
        )) ||
        null
      }
    />
  </StyledListItem>
);

export default React.memo(SimpleTrack);

const StyledListItem = styled(ListItem)({
  cursor: 'pointer',
  borderRadius: '7px',
  '&:hover': {
    backgroundColor: LI_HOVER,
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#00000090',
    border: '1px solid #ffffff40',
  },
});
