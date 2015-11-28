import React from 'react';

import '../assets/cameo.css';

export class ShutterButton extends React.Component {
  static propTypes = {
    onTouch: React.PropTypes.func,
    isWaiting: React.PropTypes.bool,
  };

  static defaultProps = {
    height: '150px',
    margin: '10%'
  };

  onTouch = () => {
    if (!this.isDisabled()) {
      if (this.props.onTouch) {
        this.props.onTouch();
      }
    }
  };

  isDisabled() {
    return this.props.isWaiting;
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
      focus-transition-rotation-180 focus-transition-minimal-opacity';
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

  render() {
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