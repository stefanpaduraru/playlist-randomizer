import React from 'react';
import FancyTrack from './FancyTrack';
import SimpleTrack from './SimpleTrack';

const Track = ({ skey, video, selected, playVideo, visualEffectsEnabled }) =>
  visualEffectsEnabled ? (
    <FancyTrack skey={skey} video={video} selected={selected} playVideo={playVideo} />
  ) : (
    <SimpleTrack skey={skey} video={video} selected={selected} playVideo={playVideo} />
  );

export default Track;
