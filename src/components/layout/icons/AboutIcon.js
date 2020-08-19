import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import {
  BUTTON_HOVER,
  BUTTON_ACTIVE,
  BUTTON_ACTIVE_BG
} from '../../../constants/colors';
import { styled } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useLocation, useHistory } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const IconContainer = styled(IconButton)({
  '&': {
    backgroundColor: BUTTON_ACTIVE_BG
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

export const AboutIcon = () => {
  const location = useLocation();
  const history = useHistory();
  const isAboutPage = location.pathname.includes("about")
  const handleBack = () => history.goBack();
  const handleAbout = () => history.push("/about");

  return (
  <Tooltip
    title={!isAboutPage ? "About" : "Back"}
    onClick={!isAboutPage ? handleAbout : handleBack }>
      <IconContainer>
        {!isAboutPage
          ? <InfoIcon />
          : <ArrowBackIcon />}
      </IconContainer>
  </Tooltip>
)}