
import React from 'react';
import { AboutIcon } from './icons/AboutIcon';
import Grid from '@material-ui/core/Grid';

const Footer = () => (
  <Grid item style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
    <AboutIcon />
  </Grid>
)

export default Footer;