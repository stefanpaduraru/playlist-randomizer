import React from 'react';
import { AboutIcon } from './icons/AboutIcon';
import VisualEffectsIcon from './icons/VisualEffectsIcon';
import Grid from '@material-ui/core/Grid';

const Footer = () => (
  <Grid item style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
    <AboutIcon />
    <VisualEffectsIcon />
  </Grid>
);

export default Footer;
