import React from 'react';
import renderer from 'react-test-renderer';
import ControlButton from '../control/ControlButton';
import ShuffleIcon from '@material-ui/icons/Shuffle';

const mockFn = jest.fn();

describe('Control Button', () => {
  test('renders empty control button correctly', () => {
    const tree = renderer.create(<ControlButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders full control button correctly', () => {
    const props = {
      tooltip: 'Tooltip',
      click: mockFn,
      icon: <ShuffleIcon />,
      active: false,
    };
    const tree = renderer.create(<ControlButton {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
