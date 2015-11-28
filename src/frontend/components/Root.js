import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {App} from './App';
import {CaptureContainer} from './Capture';
import {PhotoRoll} from './PhotoRoll';

import reducer from '../core/reducer';
const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer);

export class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    const { history } = this.props;

    return (
      <Provider store = {store}>
        <Router history = {history}>
          <Route component = {App}>
            <Route path = "/" component = {CaptureContainer}/>
            <Route path = "/roll" component = {PhotoRoll}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}