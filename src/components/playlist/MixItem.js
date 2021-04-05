import React from 'react';
import SimplePlaylistItem from './SimplePlaylistItem';

const MixItem = ({ name, onClick, onDelete }) => (
  <SimplePlaylistItem onClick={onClick} id={name} title={name} onDelete={onDelete} />
);

export default React.memo(MixItem);
