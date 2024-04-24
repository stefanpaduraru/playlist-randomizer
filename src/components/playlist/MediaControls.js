import { useEffect } from 'react';

export const MediaControls = ({ onNext, onPrevious }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      switch (event.key) {
        case 'MediaTrackNext':
          onNext();
          break;
        case 'MediaTrackPrevious':
          onPrevious();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, onPrevious]);

  return null;
};

export default MediaControls;
