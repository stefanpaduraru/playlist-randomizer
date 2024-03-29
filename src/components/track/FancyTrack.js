import React from 'react';
import { LI_HOVER } from '../../constants/colors';
import { styled, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const FancyTrack = ({ skey, video, selected, playVideo, playlist }) => (
  <React.Fragment key={skey}>
    <StyledListItem
      onClick={() => playVideo(video, skey)}
      selected={selected}
      id={(video && video.id) || null}
      data-key={skey}
    >
      <ListItemAvatar>
        <Avatar
          alt={(!!video && !!video.snippet && video.snippet.title) || null}
          src={
            !!video &&
            !!video.snippet &&
            !!video.snippet.thumbnails &&
            !!video.snippet.thumbnails.default
              ? video.snippet.thumbnails.default.url
              : ''
          }
        />
      </ListItemAvatar>
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
    <Divider />
  </React.Fragment>
);

export default React.memo(FancyTrack);

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
