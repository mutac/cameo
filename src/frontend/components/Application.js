import React from 'react';
import { fetchImages } from '../actions/image';
import { connect } from 'react-redux';

import '../assets/cameo.css';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipe} from 'react-photoswipe';

class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchImages());
  }

  handleClose() {
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
      <PhotoSwipe
        isOpen={true}
        items={this.props.items}
        options={this.props.options}
        onClose={this.handleOnClose} />
    );
  }
}

function mapStateToProps(state) {
  return { items: state.items };
}

export default connect(mapStateToProps)(Application);