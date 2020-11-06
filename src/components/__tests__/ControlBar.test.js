import React from 'react';
import renderer from 'react-test-renderer';
import ControlBar from '../control/ControlBar';

const mockFn = jest.fn();

describe('Control Bar', () => {
  test('renders empty control bar correctly', () => {
    const tree = renderer.create(<ControlBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders full control bar correctly', () => {
    const props = {
      playNext: mockFn,
      playPrevious: mockFn,
      togglePlayPause: mockFn,
      isPlaying: false,
      toggleRepeat: mockFn,
      repeat: false,
      shuffle: mockFn,
    };
    const tree = renderer.create(<ControlBar {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
