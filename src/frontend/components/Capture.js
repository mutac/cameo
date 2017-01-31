import React from 'react';
import {connect} from 'react-redux';

import {SwipeToExit} from './SwipeToExit';
import {ShutterButton} from './ShutterButton';

import {takePicture} from '../core/actions';
import {isWaitingForNewImage} from '../core/state';

export class Capture extends React.Component {
  static propTypes = {
    isWaiting: React.PropTypes.bool
  };

  static defaultProps = {
    isWaiting: false
  }

  onCaptureTouch = () => {
    console.log('Taking a picture');
    this.props.dispatch(takePicture());
  };

  onCaptureExit = () => {
    console.log('Exiting Capture');
  }

  render() {
    console.log('rendering Capture');

    let errorMessage = null;
    if (this.props.captureFailure) {
      errorMessage = (
        <div key = 'error' className = 'take-picture error-text'>
          Unable to take picture :-(
          <div className = 'exception-text'>
            {this.props.captureFailure.message}
          </div>
        </div>
      )
    }

    return (
      <div>
        <ShutterButton key = "shutter"
          onTouch = {this.onCaptureTouch}
          spin = {this.isWaiting}
          disable = {this.isWaiting}/>
        {errorMessage}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isWaiting: isWaitingForNewImage(state),
    captureFailure: state.get('failure')
  };
}

export const CaptureContainer = connect(mapStateToProps)(Capture);

// Note: It should not be necessary to have a connected
// component here.
//
// There appears to be a bug that prevents grand parents
// from setting props on grandchildren directly.  This
// will not cause a re-render of the grandchild (though
// it will re-render the child).
/*
  render() {
    return (
      <Parent>
        <Child someProp = {this.props.something}
      </Parent>
    );
  }
*/
const ShutterButtonContainer = connect((state) => {
  return {
    isWaiting: isWaitingForNewImage(state)
  }
})(ShutterButton);
