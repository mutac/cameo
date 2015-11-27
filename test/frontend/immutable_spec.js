
import {expect} from 'chai';
import {List, Map} from 'immutable';
import './chai-use-immutable';

describe('immutability', () => {
  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    function addWeasle(currentState, weasle) {
      return currentState.push(weasle);
    }

    it('is immutable', () => {
      let state = List.of('Ferret', 'Marmot');
      let nextState = addWeasle(state, 'Mink');

      expect(nextState).to.equal(List.of(
        'Ferret',
        'Marmot',
        'Mink'
      ));
      expect(state).to.equal(List.of(
        'Ferret',
        'Marmot'
      ));
    });
  });

  describe('a tree', () => {
    function addWeasle(currentState, weasle) {
      return currentState.update('weasles', weasles => weasles.push(weasle));
    }

    it('is immutable', () => {
      let state = Map({
        'weasles': List.of('Ferret', 'Marmot')
      });
      let nextState = addWeasle(state, 'Mink');

      expect(nextState).to.equal(Map({
        weasles: List.of(
          'Ferret',
          'Marmot',
          'Mink'
        )
      }));
      expect(state).to.equal(Map({
        weasles: List.of(
          'Ferret',
          'Marmot'
        )
      }));
    });
  });
});
