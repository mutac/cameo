import {expect} from '../util/chai-use-immutable';
import '../util/dom';

import React from 'react';
import ReactMount from 'react-mount';
import TestUtils from 'react-addons-test-utils';

import {ShutterButton} from '../../src/frontend/components/ShutterButton';

describe('ShutterButton', () => {

  function touch(component)
  {
    var icon = component.subComponents().shutterIcon.ref;
    TestUtils.Simulate.click(icon);
  }

  it('responds to touch', () => {
    let touched = 0;
    function onTouch() {
      touched = touched + 1;
    }

    const component = TestUtils.renderIntoDocument(
      <ShutterButton onTouch = {onTouch}/>
    );

    touched = 0;
    touch(component);
    expect(touched).to.equal(1);

    /*
    touched = 0;
    TestUtils.SimulateNative.touchStart(
      icon,
      TestUtils.nativeTouchData(0,0)
    );
    TestUtils.SimulateNative.touchEnd(
      icon,
      TestUtils.nativeTouchData(0,0)
    );
    expect(touched).to.equal(1);
    */
  });

  it('is disabled', () => {
    let touched = 0;
    function onTouch() {
      touched = touched + 1;
    }

    const component = TestUtils.renderIntoDocument(
      <ShutterButton
        disabled = {true}
        onTouch = {onTouch}/>
    );

    touched = 0;
    touch(component);
    expect(touched).to.equal(0);

    expect(component.isDisabled()).to.be.true;
  });
});
