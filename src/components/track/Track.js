import React from 'react';
import FancyTrack from './FancyTrack';
import SimpleTrack from './SimpleTrack';

const Track = ({ playlist, skey, video, selected, playVideo, visualEffectsEnabled }) =>
  visualEffectsEnabled ? (
    <FancyTrack
      skey={skey}
      video={video}
      selected={selected}
      playVideo={playVideo}
      playlist={playlist}
    />
  ) : (
    <SimpleTrack
      skey={skey}
      video={video}
      selected={selected}
      playVideo={playVideo}
      playlist={playlist}
    />
  );

export default Track;
