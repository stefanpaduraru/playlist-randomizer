import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Main from './Main';

class AppContainer extends Component {
  render() {
    const { children } = this.props;

    return (
        <Main>
          {!!children && children}
        </Main>
    )
  }
}

AppContainer.propTypes = {
  match: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
}

export default (withRouter(AppContainer));
