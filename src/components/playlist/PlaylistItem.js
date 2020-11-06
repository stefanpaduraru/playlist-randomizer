import React from 'react';
import FancyPlaylistItem from './FancyPlaylistItem';
import SimplePlaylistItem from './SimplePlaylistItem';

const PlaylistItem = ({
  id,
  title,
  thumbUrl,
  onClick,
  visualEffectsEnabled,
  onDelete,
  onRefresh,
}) =>
  visualEffectsEnabled ? (
    <FancyPlaylistItem
      onClick={onClick}
      id={id}
      title={title}
      thumbUrl={thumbUrl}
      onDelete={onDelete}
      onRefresh={onRefresh}
    />
  ) : (
    <SimplePlaylistItem
      onClick={onClick}
      id={id}
      title={title}
      onDelete={onDelete}
      onRefresh={onRefresh}
    />
  );

export default React.memo(PlaylistItem);
