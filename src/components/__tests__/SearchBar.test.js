import React from 'react';
import renderer from 'react-test-renderer';
import SearchBar from '../playlist/SearchBar';

describe('Search Bar', () => {
  test('renders emptysearch bar correctly', () => {
    const tree = renderer.create(<SearchBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
