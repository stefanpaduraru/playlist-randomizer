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
