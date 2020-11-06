import React from 'react';
import PropTypes from 'prop-types';
import {
  BUTTON_HOVER,
  BUTTON_COLOR,
  BUTTON_ACTIVE,
  BUTTON_ACTIVE_BG,
} from '../../constants/colors';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

const StyledIconButton = styled(IconButton)({
  '& > span > svg': {
    color: BUTTON_COLOR,
  },
  '&:hover': {
    backgroundColor: BUTTON_HOVER,
    color: '#fff !important',
  },
  '&:hover > span > svg': {
    color: '#fff',
  },
});

const StyledSelectedIconButton = styled(IconButton)({
  '&': {
    backgroundColor: BUTTON_ACTIVE_BG,
  },
  '& > span > svg': {
    color: BUTTON_ACTIVE,
  },
  '&:hover > span > svg': {
    color: '#fff',
  },
  '&:hover': {
    backgroundColor: BUTTON_HOVER,
    color: '#fff !important',
  },
});

class ControlButton extends React.Component {
  static propTypes = {
    tooltip: PropTypes.string,
    icon: PropTypes.object,
    click: PropTypes.func,
    active: PropTypes.bool,
  };

  render() {
    const { tooltip, click, icon, active = false } = this.props;

    return (
      <Grid item>
        <Tooltip title={tooltip || ''}>
          {active ? (
            <StyledSelectedIconButton onClick={click}>
              {!!icon && icon}
            </StyledSelectedIconButton>
          ) : (
            <StyledIconButton onClick={click}>{!!icon && icon}</StyledIconButton>
          )}
        </Tooltip>
      </Grid>
    );
  }
}

export default ControlButton;
