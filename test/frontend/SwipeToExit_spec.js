import {expect} from '../util/chai-use-immutable';
import '../util/dom';

import React from 'react';
import ReactMount from 'react-mount';
import TestUtils from 'react-addons-test-utils';

import {SwipeToExit} from '../../src/frontend/components/SwipeToExit';

describe('SwipeToExit', () => {
  it('allows no children', () => {
    function onExit() {
    }

    try {
      const component = TestUtils.renderIntoDocument(
        <SwipeToExit
          onExit = {onExit}>
        </SwipeToExit>
      );
    }
    catch (e) {
      expect('Threw exception with no children').to.equal('');
    }
  });

  it('renders a swipe component', () => {
    function onExit() {
    }

    const component = TestUtils.renderIntoDocument(
      <SwipeToExit
        onExit = {onExit}>
      </SwipeToExit>
    );

    let swipeComponent = TestUtils.findRenderedComponentWithType(
      component,
      SwipeToExit
    );

    expect(swipeComponent instanceof SwipeToExit).to.be.true;
  });

  it('renders children', () => {
    function onExit() {
    }

    const component = TestUtils.renderIntoDocument(
      <SwipeToExit
        onExit = {onExit}>
        <div className="ImASlide1"/>
        <div className="ImASlide2"/>
      </SwipeToExit>
    );

    const child1 = TestUtils.findRenderedDOMComponentWithClass(
      component, 'ImASlide1'
    );
    const child2 = TestUtils.findRenderedDOMComponentWithClass(
      component, 'ImASlide2'
    );
    // pass
  });

  it('exits on transition to exit slide', () => {
    let exited = false;
    function onExit() {
      exited = true;
    }

    const component = TestUtils.renderIntoDocument(
      <SwipeToExit
        onExit = {onExit}>
      </SwipeToExit>
    );

    const exitSlide = component.subComponents().exitSlide.ref;

    // Simulate transition to the exit slide
    // (since we cannot simulate touch events on subcomponents)
    component.transitionEnd(0, exitSlide);
    expect(exited).to.be.true;
  });

  /*
  it('exits on swipe', () => {
    const component = TestUtils.renderIntoDocument(
      <SwipeToExit/>
    );

    var node = component.refs.SwipeToExit;
    TestUtils.Simulate.click(node);

    TestUtils.SimulateNative.touchStart(
      node,
      TestUtils.nativeTouchData(0,0)
    );
    TestUtils.SimulateNative.touchEnd(
      node,
      TestUtils.nativeTouchData(0,0)
    );
  });
  */
 });