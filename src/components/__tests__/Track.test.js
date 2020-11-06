import React from 'react';
import renderer from 'react-test-renderer';
import Track from '../Track';

const mockFn = jest.fn();

describe('Track', () => {
  test('renders empty track correctly', () => {
    const tree = renderer.create(<Track />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders track  with empty video correctly', () => {
    const props = {
      skey: 1,
      selected: true,
      playVideo: mockFn,
      video: {},
    };
    const tree = renderer.create(<Track {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders full track correctly', () => {
    const props = {
      skey: 1,
      selected: true,
      playVideo: mockFn,
      video: {
        id: 'UExuVVBuX081eUM4MEVLbFd4c2EtUHFZd3c5ak5UbGVWdy4wNEU1MTI4NkZEMzVBN0JF',
        snippet: {
          title: 'The Cat Empire - Song for Elias',
          description: 'damn chill muzic',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/6Fot9g9YKyw/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/6Fot9g9YKyw/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/6Fot9g9YKyw/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
        },
      },
    };
    const tree = renderer.create(<Track {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
