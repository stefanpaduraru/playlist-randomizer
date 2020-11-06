import React from 'react';
import renderer from 'react-test-renderer';
import PlaylistItem from '../playlist/PlaylistItem';

const mockFn = jest.fn();

describe('Playlist Item', () => {
  test('renders empty item correctly', () => {
    const tree = renderer.create(<PlaylistItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders full item correctly', () => {
    const props = {
      id: 1,
      title: 'Playlist #1',
      thumbUrl: 'https://i.ytimg.com/vi/0iMell14sVQ/default.jpg',
      onClick: mockFn,
    };
    const tree = renderer.create(<PlaylistItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
