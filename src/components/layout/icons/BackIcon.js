import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { PlaylistIconContainer } from './IconContainer';

export const BackIcon = () => {
  const history = useHistory();
  const handleBack = () => history.goBack();

  return (
    <Tooltip title={'Back'} onClick={handleBack}>
      <PlaylistIconContainer>
        <ArrowBackIcon />
      </PlaylistIconContainer>
    </Tooltip>
  );
};
