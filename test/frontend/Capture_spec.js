import {expect} from '../util/chai-use-immutable';
import '../util/dom';

import React from 'react';
import ReactMount from 'react-mount';
import TestUtils from 'react-addons-test-utils';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Capture, CaptureContainer} from '../../src/frontend/components/Capture';
import {start, waitingForSlides} from '../../src/frontend/core/state';

describe('Capture', () => {
});

describe('CaptureContainer', () => {
  function createMockStore(state) {
    return {
      subscribe: () => {},
      dispatch: () => {},
      getState: () => {
        return state;
      }
    };
  }

  it('waits for slides == waiting for capture', () => {
    const state = waitingForSlides(start());
    const store = createMockStore(state);

    const component = TestUtils.renderIntoDocument(
      <Provider store = {store}>
        <CaptureContainer/>
      </Provider>
    );

    const capture = TestUtils.findRenderedComponentWithType(
      component,
      Capture
    );

    expect(capture.props.isWaitingForCapture).to.be.true;
  });
});