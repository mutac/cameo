
import {curry, compose, chain} from 'fjs';

describe('fjs', () => {
  it('can compose and curry', () => {
    const takesObj = (obj) => {
      return obj.thing = 'is fun';
    }

    const takesFun = curry( (fun, obj) => {
      return fun(obj);
    });

    let obj = { thing: 'not fun' };
    let makesFun = chain(takesFun, takesObj);

    console.log(makesFun);
    console.log(makesFun(obj));
  });
});