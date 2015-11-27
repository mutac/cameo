import React from 'react';
import { connect } from 'react-redux';
import ReactSwipe from 'react-swipe';

import SwipeToExit from './SwipeToExit';
import Capture from './Capture';
import PhotoRoll from './PhotoRoll';

import { takePicture } from '../core/actions';

class Application extends React.Component {

  renderCaptureScreen() {
    return (
      <ReactSwipe
        continuous = {false}
        disableScroll = {true}
        transitionEnd = {this.onTransition}>
          <Capture key = 'CaptureScreen'/>
          <div key = 'TransitionToPhotoRoll'/>
      </ReactSwipe>
    );
  }

  renderPhotoRoll() {
    return (
      <PhotoRoll onClose = {this.onTransition}/>
    );
  }

  renderStartScreen() {
  }

  render() {
    if (this.mode() == Mode.captureMode){
      return this.renderCaptureScreen();
    } else if (this.mode() == Mode.photoRollMode) {
      return this.renderPhotoRoll();
    }
  }
}

function mapStateToProps(state) {
  return { mostRecentlyCapturedImage: state.capturedImage };
}

export default connect(mapStateToProps)(Application);