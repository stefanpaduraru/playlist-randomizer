import React from 'react';
import FancyPlaylistItem from './FancyPlaylistItem';
import SimplePlaylistItem from './SimplePlaylistItem';

const PlaylistItem = ({
  id,
  title,
  thumbUrl,
  onClick,
  visualEffectsEnabled,
}) => (
  visualEffectsEnabled
    ? <FancyPlaylistItem
        onClick={onClick}
        id={id}
        title={title}
        thumbUrl={thumbUrl}
      />
    : <SimplePlaylistItem
        onClick={onClick}
        id={id}
        title={title}
      />
  )

export default React.memo(PlaylistItem);
