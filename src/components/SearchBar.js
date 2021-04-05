import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import * as colors from '../constants/colors';

const CssGrid = withStyles({
  root: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
})(Grid);

const SearchBarStyled = withStyles({
  root: {
    backgroundColor: '#fff',
    borderRadius: '3px',
    width: '100%',
  },
  input: {
    color: '#000',
    padding: '15px 10px',
  },
  underline: {
    '&:before': {
      borderBottom: `0px solid ${colors.PRIMARY_DIMMED}`,
    },
    '&:after': {
      borderBottom: `2px solid ${colors.PRIMARY}`,
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: `1px solid ${colors.PRIMARY_DIMMED}`,
    },
  },
})(Input);

const SearchBar = ({ setUrl, submit }) => {
  return (
    <CssGrid container alignItems="center" spacing={1}>
      <Grid item xs={10} s={11} md={11} lg={11}>
        <SearchBarStyled
          variant="standard"
          id="search"
          placeholder="Enter a youtube playlist id or playlist URL"
          margin="normal"
          onChange={setUrl}
          color="secondary"
        />
      </Grid>
      <Grid item xs={2} s={1} md={1} lg={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={submit}
          style={{ width: '100%' }}
        >
          Go
        </Button>
      </Grid>
    </CssGrid>
  );
};

SearchBar.propTypes = {
  setUrl: PropTypes.func,
  submit: PropTypes.func,
};

export default SearchBar;
