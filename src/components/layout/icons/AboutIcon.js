import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import { useLocation, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FooterIconContainer } from './IconContainer';

export const AboutIcon = () => {
  const location = useLocation();
  const history = useHistory();
  const isAboutPage = location.pathname.includes('about');
  const handleBack = () => history.goBack();
  const handleAbout = () => history.push('/about');

  return (
    <Tooltip
      title={!isAboutPage ? 'About' : 'Back'}
      onClick={!isAboutPage ? handleAbout : handleBack}
    >
      <FooterIconContainer>
        {!isAboutPage ? <InfoIcon /> : <ArrowBackIcon />}
      </FooterIconContainer>
    </Tooltip>
  );
};
