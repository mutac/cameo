import React from 'react';
import Swipe from 'react-swipe';

export class SwipeToExit extends React.Component {
  static propTypes = {
    onExit: React.PropTypes.func.isRequired
  };

  transitionEnd = (index, element) => {
    if (this.isExitSlide(element)) {
      this.props.onExit();
    }
  };

  isExitSlide(element) {
    // Use className.  Element that is passed back is not
    // a React component.
    return element.className == this.subComponents().exitSlide.className;
  }

  subComponents() {
    return {
      exitSlide: {
        ref: this.refs.Exit,
        refName: 'Exit',
        className: '_Exit'
      }
    };
  }

  getChildren() {
    return this.props.children || [];
  }

  render() {
    return (
      <Swipe
        continuous = {false}
        disableScroll = {true}
        stopPropagation = {false}
        transitionEnd = {this.transitionEnd}>
        {this.getChildren()}
        <div
          ref = {this.subComponents().exitSlide.refName}
          className = {this.subComponents().exitSlide.className}/>
      </Swipe>
    )
  }
}