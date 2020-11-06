import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import About from './containers/About';
import AppContainer from './components/layout/AppContainer';
import Dashboard from './containers/Dashboard';
import Playlist from './containers/Playlist';
import theme from './helpers/layout/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <NavBar />
          <AppContainer>
            <Switch>
              <Route exact path="/" component={Dashboard}></Route>
              <Route exact path="/about" component={About}></Route>
              <Route exact path="/:pid" component={Playlist}></Route>
            </Switch>
          </AppContainer>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
export default connect()(App);
