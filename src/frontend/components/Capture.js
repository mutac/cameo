import React from 'react';
import {connect} from 'react-redux';

import {SwipeToExit} from './SwipeToExit';
import {ShutterButton} from './ShutterButton';

import {takePicture} from '../core/actions';
import {isWaitingForSlides} from '../core/state';

export class Capture extends React.Component {

  onCaptureTouch = () => {
    console.log('Taking a picture');
  };

  onCaptureExit = () => {
    console.log('Exiting Capture');
  }

  render() {
    return (
      <SwipeToExit onExit = {this.onCaptureExit}>
        <ShutterButton
          isWaiting = {this.props.isWaitingForCapture}
          onTouch = {this.onCaptureTouch}/>
      </SwipeToExit>
    );
  }
}

function mapStateToProps(state) {
  return {
    isWaitingForCapture: isWaitingForSlides(state)
  }
}

export const CaptureContainer = connect(mapStateToProps)(Capture);