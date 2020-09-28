import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FooterIconContainer } from './IconContainer';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import Crop32Icon from '@material-ui/icons/Crop32';
import {
  toggleBackground,
} from '../../../state/actionCreators/app';
import setRandomBg from '../../../helpers/layout/bg';

class DynamicBackgroundIcon extends React.Component {
  constructor(props) {
    super(props);
    this.toggleBackgroundOnOff = this.toggleBackgroundOnOff.bind(this);
  }

  toggleBackgroundOnOff(toggle) {
    const { toggleBackground } = this.props;
    toggleBackground(toggle);
    setRandomBg(toggle);
  }

  render() {
    const { app } = this.props;

    return (
      <Tooltip
        title={
          `${!app.isDynamicBackgroundOn ? "Enable" : "Disable"} dynamic background`
        }
        >
          <FooterIconContainer
            onClick={() => this.toggleBackgroundOnOff(!app.isDynamicBackgroundOn)}
          >
            {!app.isDynamicBackgroundOn
              ? <WallpaperIcon />
              : <Crop32Icon />}
          </FooterIconContainer>
      </Tooltip>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleBackground: (toggle) => dispatch(toggleBackground(toggle))
})

const mapStateToProps = (state) => ({
  app: state.app,
})

DynamicBackgroundIcon.propTypes = {
  toggleBackground: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicBackgroundIcon);
