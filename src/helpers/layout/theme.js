import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '../../constants/colors';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: colors.PRIMARY,
      contrastText: '#fff',
    },
    secondary: {
      main: colors.SECONDARY,
      contrastText: '#fff',
    },
    divider: colors.DIVIDER,
    background: {
      paper: colors.PAPER,
    },
  },
  typography: { color: colors.TEXT_PRIMARY, useNextVariants: true },
  status: {
    danger: 'orange',
  },
  overrides: {
    MuiPaper: {
      root: {
        color: colors.TEXT_SECONDARY,
      },
    },
    MuiButton: {
      root: {
        padding: '13px 10px',
      },
    },
    MuiInput: {
      root: {
        backgroundColor: '#fff',
        borderRadius: '3px',
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
    },
    MuiToolbar: {
      gutters: {
        [defaultTheme.breakpoints.up('sm')]: {
          paddingLeft: '30px',
          paddingRight: '30px',
        },
      },
    },
    MuiListItemText: {
      root: {
        cursor: 'pointer',
      },
      secondary: {
        color: colors.TEXT_SECONDARY_DIMMED,
        cursor: 'pointer',
      },
    },
  },
});

export default theme;
