import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {
  withStyles
} from '@material-ui/core/styles'

const CssTextField = withStyles({
  root: {
    color: '#fff',
    width: '100%',
    margin: 0
  }
})(TextField);

const CssGrid = withStyles({
  root: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  }
})(Grid);

const SearchBar = ({ setUrl, submit }) => {
  return (
    <CssGrid container alignItems='center' spacing={1}>
      <Grid item xs={10} s={11} md={11} lg={11}>
        <CssTextField
          variant='standard'
          id='search'
          placeholder='Enter a youtube playlist id or playlist URL'
          margin='normal'
          onChange={setUrl}
          color='secondary'
        />
      </Grid>
      <Grid item xs={2} s={1} md={1} lg={1}>
        <Button variant='contained' color='primary' onClick={submit} style={{ width: '100%' }}>Go</Button>
      </Grid>
    </CssGrid>
  )
}

SearchBar.propTypes = {
  setUrl: PropTypes.func,
  submit: PropTypes.func
}

export default SearchBar;
