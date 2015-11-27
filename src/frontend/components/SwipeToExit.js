import React from 'react';
import ReactSwipe from 'react-swipe';

class SwipeToExit extends React.Component {
  static defaultProps = {
    onExit: React.PropTypes.func
  };

  onTransition = (index, elem) => {
  };

  render() {
    return (
      <ReactSwipe
        continuous = {false}
        disableScroll = {true}
        transitionEnd = {this.onTransition}>
        {this.props.children}
        <div key = 'ExitTransition'/>
      </ReactSwipe>
    )
  }
}

export default SwipeToExit;