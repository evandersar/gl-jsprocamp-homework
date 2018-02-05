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
    var collection = args || [];

    this.size = collection.length;
    //this.values = collection;
    //this.getSize = () => collection.length;

    this.has = (element) => {
      return collection.includes(element);
    };

    this.add = (element) => {
      if (this.has(element)) {
        return false;
      }
      collection.push(element);
      this.size++;
      return true;
    };

    this.delete = (element) => {
      if (!this.has(element)) {
        return false;
      }
      collection.splice(collection.indexOf(element), 1);
      this.size--;
      return true;
    };

    this.clear = () => {
      collection = [];
      this.size = 0;
    };

    this.forEach = (fn) => {
      for (let item of collection) {
        fn(item);
      }
    };

  }

  return new mySet(arr);
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
    var collection = args || [];
    this.size = collection.length;

    this.has = (key) => {
      return collection.some(elem => elem[0] === key);
    };

    this.set = (key, value) => {
      if (this.has(key)) {
        return false;
      }
      collection.push([key, value]);
      this.size++;
      return true;
    };
    
    this.get = (key) => {
      let pair = collection.find((elem) => {
        return elem[0] === key; 
      });
      
      return pair[1];
    };

    this.delete = (key) => {
      if (!this.has(key)) {
        return false;
      }
      //console.log('collection => ', collection);
      let startInd = collection.findIndex((elem, index, arr) => {
        return elem[0] === key;
      });
      collection.splice(startInd, 1);
      //console.log('collection spliced=> ', collection);
      this.size--;
      return true;
    };

    this.clear = () => {
      collection = [];
      this.size = 0;
    };

    this.forEach = (fn) => {
      for (let [key, value] of collection) {
        fn(value, key);
      }
    };

  }

  return new myMap(arr);
}

export default {
  createSet,
  createMap
};
