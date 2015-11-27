import React from 'react';
import { captureImage } from '../core/actions';
import { connect } from 'react-redux';

import '../assets/cameo.css';

class Capture extends React.Component {
  static propTypes = {
    onCapture: React.PropTypes.func
  };

  static defaultProps = {
    height: '150px',
    margin: '10%'
  };

  onCaptureRequested = () => {
    console.log("Capture Requested");
    this.props.dispatch(captureImage());

    if (this.props.onCapture) {
      this.props.onCapture();
    }
  };

  style() {
    return {
      height: this.props.height,
      margin: this.props.margin
    }
  }

  render() {
    return (
      <div>
        <div className='capture-slide'>
          <div
            onClick = {this.onCaptureRequested}
            onFocus = {this.onCaptureRequested}
            className='shutter-icon transition-easy transition-rotation transition-opacity'
            style={this.style()}>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { capturedImage: state.capturedImage };
}

export default connect(mapStateToProps)(Capture);