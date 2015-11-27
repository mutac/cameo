import React from 'react';
import { getSlides } from '../core/actions';
import { connect } from 'react-redux';

import '../assets/cameo.css';
import 'react-photoswipe/lib/photoswipe.css';

import {PhotoSwipe} from 'react-photoswipe';

class PhotoRoll extends React.Component {
  static propTypes = {
    onClose: React.PropTypes.func
  };

  static defaultProps = {
    options: {

      // Disable closing...
      /*
      pinchToClose: false,
      tapToClose: false,
      clickToCloseNonZoomable: false,
      closeOnScroll: false,
      closeOnVerticalDrag: false,
      escKey: false,
      closeEl: false,
      */

      focus: true,
      modal: false,
      preload: [ 1, 1 ],
      history: false
    }
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getSlides());
  }

  onClose = () => {
    this.setState({
      isOpen: false
    }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  }

  render() {
    return (
      <PhotoSwipe
        isOpen={true}
        items={this.props.slides}
        options={this.props.options}
        onClose={this.onClose}/>
    );
  }
}

function mapStateToProps(state) {
  return { slides: state.slides };
}

export default connect(mapStateToProps)(PhotoRoll);