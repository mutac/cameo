import React from 'react';
import {connect} from 'react-redux';

import {isWaitingForSlides} from '../core/state';

import '../assets/cameo.css';

export class ShutterButton extends React.Component {
  static propTypes = {
    onTouch: React.PropTypes.func,
    spin: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  };

  static defaultProps = {
    height: '150px',
    margin: '10%',
    spin: false,
    disabled: false
  };

  onTouch = () => {
    if (!this.isDisabled()) {
      if (this.props.onTouch) {
        this.props.onTouch();
      }
    }
  };

  isDisabled() {
    return this.props.disabled;
  }

  shutterIconStyle() {
    return {
      height: this.props.height,
      margin: this.props.margin
    }
  }

  shutterIconClassNames() {
    if (this.props.isWaiting) {
      return this.shutterAnimationStyleClassNames();
    } else {
      return this.shutterTransitionStyleClassNames();
    }
  }

  shutterTransitionStyleClassNames() {
    return 'shutter-icon maximal-opacity transition-ease \
      active-transition-rotation-180 active-transition-minimal-opacity';
  }

  shutterAnimationStyleClassNames() {
    return 'shutter-icon minimal-opacity animation-rotation-360';
  }

  subComponents() {
    return {
      shutterIcon: {
        ref: this.refs.ShutterIcon,
        refName: 'ShutterIcon',
        className: this.shutterIconClassNames()
      }
    }
  }

  getChildren() {
    return this.props.children || [];
  }

  render() {
    console.log("Rendering button");
    return (
      <div>
        <div className = 'shutter-icon-container'>
          <div
            onClick = {this.onTouch}
            ref = {this.subComponents().shutterIcon.refName}
            className = {this.subComponents().shutterIcon.className}
            style = {this.shutterIconStyle()}>
          </div>
        </div>
      </div>
    );
  }
}