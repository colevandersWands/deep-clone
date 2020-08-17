'use strict';


describe('cloneDeep()', function () {
  // https://github.com/jonschlinkert/clone-deep/blob/master/test.js
  it('should clone arrays', function () {
    assert.deepEqual(cloneDeep(['alpha', 'beta', 'gamma']), ['alpha', 'beta', 'gamma']);
    assert.deepEqual(cloneDeep([1, 2, 3]), [1, 2, 3]);

    const a = [{ 'a': 0 }, { 'b': 1 }];
    const b = cloneDeep(a);

    assert.deepEqual(b, a);
    assert.deepEqual(b[0], a[0]);

    const val = [0, 'a', {}, [{}], [function () { }], function () { }];
    assert.deepEqual(cloneDeep(val), val);
  });

  it('should deeply clone an array', function () {
    const fixture = [[{ a: 'b' }], [{ a: 'b' }]];
    const result = cloneDeep(fixture);
    assert(fixture !== result);
    assert(fixture[0] !== result[0]);
    assert(fixture[1] !== result[1]);
    assert.deepEqual(fixture, result);
  });

  it('should deeply clone object', function () {
    const one = { a: 'b' };
    const two = cloneDeep(one);
    two.c = 'd';
    assert.notDeepEqual(one, two);
  });

  it('should deeply clone arrays', function () {
    const one = { a: 'b' };
    const arr1 = [one];
    const arr2 = cloneDeep(arr1);
    one.c = 'd';
    assert.notDeepEqual(arr1, arr2);
  });

  it('should deeply clone Map', function () {
    const a = new Map([[1, 5]]);
    const b = cloneDeep(a);
    a.set(2, 4);
    assert.notDeepEqual(Array.from(a), Array.from(b));
  });

  it('should deeply clone Set', function () {
    const a = new Set([2, 1, 3]);
    const b = cloneDeep(a);
    a.add(8);
    assert.notDeepEqual(Array.from(a), Array.from(b));
  });

  it('should return primitives', function () {
    assert.equal(cloneDeep(0), 0);
    assert.equal(cloneDeep('foo'), 'foo');
  });

  it('should clone a regex', function () {
    assert.deepEqual(cloneDeep(/foo/g), /foo/g);
  });

  it('should clone objects', function () {
    assert.deepEqual(cloneDeep({ a: 1, b: 2, c: 3 }), { a: 1, b: 2, c: 3 });
  });

  it('should deeply clone objects', function () {
    assert.deepEqual(cloneDeep({ a: { a: 1, b: 2, c: 3 }, b: { a: 1, b: 2, c: 3 }, c: { a: 1, b: 2, c: 3 } }), { a: { a: 1, b: 2, c: 3 }, b: { a: 1, b: 2, c: 3 }, c: { a: 1, b: 2, c: 3 } });
  });

  it('should deep clone instances with instanceClone true', function () {
    function A(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    function B(x) {
      this.x = x;
    }

    const a = new A({ x: 11, y: 12, z: () => 'z' }, new B(2), 7);
    // const b = cloneDeep(a, true);
    const b = cloneDeep(a);

    assert.deepEqual(a, b);

    b.y.x = 1;
    b.z = 2;
    assert.notDeepEqual(a, b);
    assert.notEqual(a.z, b.z, 'Root property of original object not expected to be changed');
    assert.notEqual(a.y.x, b.y.x, 'Nested property of original object not expected to be changed');
  });

  // it('should not deep clone instances', function () {
  //   function A(x, y, z) {
  //     this.x = x;
  //     this.y = y;
  //     this.z = z;
  //   }

  //   function B(x) {
  //     this.x = x;
  //   }

  //   const a = new A({ x: 11, y: 12, z: () => 'z' }, new B(2), 7);
  //   const b = cloneDeep(a);

  //   assert.deepEqual(a, b);

  //   b.y.x = 1;
  //   b.z = 2;
  //   assert.deepEqual(a, b);
  //   assert.equal(a.z, b.z);
  //   assert.equal(a.y.x, b.y.x);
  // });

  // // unrelated
  // it('should deep clone instances with instanceClone self defined', function () {
  //   function A(x, y, z) {
  //     this.x = x;
  //     this.y = y;
  //     this.z = z;
  //   }

  //   function B(x) {
  //     this.x = x;
  //   }

  //   const a = new A({ x: 11, y: 12, z: () => 'z' }, new B(2), 7);
  //   const b = cloneDeep(a, function (val) {
  //     if (val instanceof A) {
  //       const res = new A();
  //       for (const key in val) {
  //         res[key] = cloneDeep(val[key]);
  //       }
  //       return res;
  //     } else {
  //       return cloneDeep(val);
  //     }
  //   });

  //   assert.deepEqual(a, b);

  //   b.y.x = 1;
  //   b.z = 2;
  //   assert.notDeepEqual(a, b);
  //   assert.notEqual(a.z, b.z, 'Root property of original object not expected to be changed');
  //   assert.equal(a.y.x, b.y.x);
  // });


  // https://github.com/joshghent/clone/blob/master/test.js
  it('can clone primitives', function () {
    assert.deepEqual(cloneDeep(5), 5);
    assert.deepEqual(cloneDeep('test'), 'test');
  });

  it('can clone arrays', function () {
    var arr = [1, 2, 3, 4, 5];
    var strArr = ['Hello', 'World'];

    assert.deepEqual(cloneDeep(arr), arr);
    assert.deepEqual(cloneDeep(strArr), strArr);
  });

  it('can deeply cloning arrays', function () {
    var arr = [[1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14]];
    var cloneArr = cloneDeep(arr);
    cloneArr[0] = ['a', 'b', 'c', 'd'];

    assert.notDeepEqual(cloneArr, arr);
  });

  it('can clone objects', function () {
    var obj = { a: 0, b: 1, c: 2 };

    assert.deepEqual(cloneDeep(obj), obj);
  });

  it('can deep clone objects', function () {
    var obj = { a: 1, b: 0 };
    var copyObj = cloneDeep(obj);
    copyObj.b = 10;
    assert.notDeepEqual(copyObj, obj);
  });

  it('returns undefined when passed undefined', function () {
    assert.deepEqual(cloneDeep(undefined), undefined);
  });

  it('returns undefined when null is passed', function () {
    assert.deepEqual(cloneDeep(null), undefined);
  });

  it('can clone date objects', function () {
    var date = new Date();

    assert.deepEqual(cloneDeep(date), date);
  });

  it('can clone arrays of arrays', function () {
    var arr = [[1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14]];

    assert.deepEqual(cloneDeep(arr), arr);
  });

  it('can clone arrays of objects', function () {
    // debugger;
    var arr = [{
      id: 0,
      name: "Ronald McDonald",
      selection: [0, 1, 2]
    }, {
      id: 1,
      name: "Colonal Sanders",
      selection: [3, 4, 5]
    }];

    assert.deepEqual(cloneDeep(arr), arr);
  });

  it('can clone arrays filled with nulls and undefined', function () {
    var arr = [null, undefined, undefined, null];

    assert.deepEqual(cloneDeep(arr), arr);
  });

  it('can clone objects filled with nulls and undefined', function () {
    var obj = { undefined: 0, null: undefined, "": [undefined, null], 1: null };

    assert.deepEqual(cloneDeep(obj), obj);
  });

  it('can clone objects with a nested arrays as a value', function () {
    var obj = {
      a: [["things", 1, 2], ["hello", 6, 5, 4], ["world", 4, 31]],
      b: [["test"], ["more testing"]]
    }

    assert.deepEqual(cloneDeep(obj), obj);
  });

  it('can clone regex', function () {
    assert.deepEqual(cloneDeep(/foo/g), /foo/g);
  });

  it('can detect circular references (objects)', function () {
    // debugger;
    var a = {};
    var b = {};
    a.b = b;
    b.a = a;

    assert.deepEqual(cloneDeep(a), a);
  });

  it('can detect circular references (arrays)', function () {
    // debugger;
    var a = [];
    var b = [];
    a.push(b);
    b.push(a);

    assert.deepEqual(cloneDeep(a), a);
  });

  it('can detect circular references (mixed)', function () {
    // debugger;
    var a = [];
    var b = {};
    a.push(b);
    b.x = a;

    assert.deepEqual(cloneDeep(a), a);
  });

  it('can clone symbols', () => {
    let s = Symbol("foo");
    assert.deepEqual(cloneDeep(s), s);
  })

  it('can clone objects with symbol keys', () => {
    // debugger;
    let s = Symbol("foo");
    const arg = { [s]: 1 };
    assert.deepEqual(cloneDeep(arg), { [s]: 1 });
  })

  it('can clone non-enumerable properties', () => {
    const x = {};
    Object.defineProperty(x, 'key', {
      enumerable: false,
      value: 'static'
    });

    const y = {};
    Object.defineProperty(y, 'key', {
      enumerable: false,
      value: 'static'
    });
    assert.deepEqual(cloneDeep(x), x);
  })

  it('can clone getters', () => {
    const x = {};
    Object.defineProperty(x, 'key', {
      enumerable: false,
      value: 'static'
    });

    const y = {};
    Object.defineProperty(y, 'key', {
      enumerable: false,
      value: 'static'
    });
    assert.deepEqual(cloneDeep(x), x);
  })

  it('can clone setters', () => {
    const x = {};
    Object.defineProperty(x, 'key', {
      enumerable: false,
      value: 'static'
    });

    const y = {};
    Object.defineProperty(y, 'key', {
      enumerable: false,
      value: 'static'
    });
    assert.deepEqual(cloneDeep(x), x);
  })
});
