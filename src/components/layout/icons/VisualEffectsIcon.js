import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FooterIconContainer } from './IconContainer';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import Crop32Icon from '@material-ui/icons/Crop32';
import { toggleVisualEffects } from '../../../state/actionCreators/app';
import setRandomBg from '../../../helpers/layout/bg';

class VisualEffectsIcon extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisualEffectsOnOff = this.toggleVisualEffectsOnOff.bind(this);
  }

  toggleVisualEffectsOnOff(toggle) {
    const { toggleVisualEffects } = this.props;
    toggleVisualEffects(toggle);
    setRandomBg(toggle);
  }

  render() {
    const { app } = this.props;

    return (
      <Tooltip title={`${!app.isVisualEffectsOn ? 'Enable' : 'Disable'} visual effects`}>
        <FooterIconContainer
          onClick={() => this.toggleVisualEffectsOnOff(!app.isVisualEffectsOn)}
        >
          {!app.isVisualEffectsOn ? <WallpaperIcon /> : <Crop32Icon />}
        </FooterIconContainer>
      </Tooltip>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleVisualEffects: toggle => dispatch(toggleVisualEffects(toggle)),
});

const mapStateToProps = state => ({
  app: state.app,
});

VisualEffectsIcon.propTypes = {
  toggleVisualEffects: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualEffectsIcon);
