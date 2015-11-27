import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Application from './Application';
import reducer from '../core/reducer';

const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer);

export default class Root extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <Route path='/' component={ Application } />
        </Router>
      </Provider>
    );
  }
}
Root.propTypes = {
    history: PropTypes.object.isRequired
};