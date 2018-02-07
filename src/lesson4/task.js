/*
  Write a function that creates custom set object. Function
  accepts single optional parameter (array) do define initial
  set content.
  Set should have add(), has(), delete(), forEach(), clear() methods
  and size property. Should not use es6 objects Set, WeakSet,
  but work in similar way. Set should preserve addition order
  in forEach() method.
  mySet = createSet(['a', 'b', 'c'])
*/
export function createSet(arr) {

  function mySet(args) {
    this.collection = args ? args.slice() : [];

    //this.size = this.collection.length;
    //this.getSize = () => this.collection.length;
    
    this.has = (element) => {
      return this.collection.includes(element);
    };

    this.add = (element) => {
      if (this.has(element)) {
        return false;
      }
      this.collection.push(element);
      //this.size++;
      return true;
    };

    this.delete = (element) => {
      if (!this.has(element)) {
        return false;
      }
      this.collection.splice(this.collection.indexOf(element), 1);
      //this.size--;
      return true;
    };

    this.clear = () => {
      this.collection = [];
      //this.size = 0;
    };

    this.forEach = (fn) => {
      for (let item of this.collection) {
        fn(item);
      }
    };

  }

  let mySetObj = new mySet(arr);

  Object.defineProperty(mySetObj, "size", {
    get: function() {
      return this.collection.length;
    }
  });

  return mySetObj;
}

/*
  Write a function that creates custom map object. Function
  accepts single optional parameter (array) do define initial
  map content.
  Map should have set(), get(), has(), delete(), forEach(), clear()
  methods and size property. Should not use es6 objects Map, WeakMap,
  but work in similar way. Map should preserve addition order
  in forEach() method.
  myMap = createMap([['a', 1], ['b', 2], ['c', 3]])
*/
export function createMap(arr) {

  function myMap(args) {
    this.collection = args ? args.slice() : [];

    this.has = (key) => {
      return this.collection.some(elem => elem[0] === key);
    };

    this.set = (key, value) => {
      if (this.has(key)) {
        return false;
      }
      this.collection.push([key, value]);
      return true;
    };

    this.get = (key) => {
      let pair = this.collection.find((elem) => {
        return elem[0] === key;
      });

      return pair[1];
    };

    this.delete = (key) => {
      if (!this.has(key)) {
        return false;
      }
      //console.log('collection => ', collection);
      let startInd = this.collection.findIndex((elem, index, arr) => {
        return elem[0] === key;
      });
      this.collection.splice(startInd, 1);
      //console.log('collection spliced=> ', collection);
      return true;
    };

    this.clear = () => {
      this.collection = [];
    };

    this.forEach = (fn) => {
      for (let [key, value] of this.collection) {
        fn(value, key);
      }
    };

  }
  
  let myMapObj = new myMap(arr);

  Object.defineProperty(myMapObj, "size", {
    get: function() {
      return this.collection.length;
    }
  });

  return myMapObj;
}

export default {
  createSet,
  createMap
};
