import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List, Map} from 'immutable';

chai.use(chaiImmutable);

function isImmutable(obj) {
  let isMap = obj instanceof Map;
  let isList = obj instanceof List;

  return isMap || isList;
}

chai.use((_chai, utils) => {
  utils.overwriteMethod(_chai.Assertion.prototype, 'equal', function(_super) {
    return function(other) {
      let obj = utils.flag(this, 'object');
      if (isImmutable(obj)) {
        // Workaround chaiImmutable bug, does not correctly
        // assert deep equality of Immutable objects..
        return new _chai.Assertion(obj.toJS()).to.eql(other.toJS());
      } else {
        _super.apply(this, arguments);
      }
    };
  });
});

export let expect = chai.expect;