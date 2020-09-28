import {
  BUTTON_HOVER,
  BUTTON_ACTIVE,
} from '../../../constants/colors';
import { styled } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

export const FooterIconContainer = styled(IconButton)({
  '&': {
  },
  '& > span > svg': {
    color: BUTTON_ACTIVE
  },
  '&:hover > span > svg': {
    color: '#fff'
  },
  '&:hover': {
    backgroundColor: BUTTON_HOVER,
    color: '#fff !important'
  }
});
  