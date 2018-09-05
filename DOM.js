(function (win, doc) {
  'use strict';

  function DOM(elements) {
    if(!(this instanceof DOM) )
      return new DOM(elements);

    this.element = doc.querySelectorAll(elements);

  }

  DOM.isType = function isType(param) {
    return Object.prototype.toString.call(param);
  };

  DOM.isArray = function isArray(param) {
    return this.isType(param) === "[object Array]";
  };

  DOM.isFunction = function isFunction(param) {
    return this.isType(param) === "[object Function]";
  };

  DOM.isNumber = function isNumber(param) {
    return this.isType(param) === "[object Number]";
  };

  DOM.isString = function isString(param) {
    return this.isType(param) === "[object String]";
  };

  DOM.isObject = function isObject(param) {
    return this.isType(param) === "[object Object]";
  };

  DOM.isBoolean = function sBoolean(param) {
    return this.isType(param) === "[object Boolean]";
  };
  DOM.isNull = function isNull(param) {
    return this.isType(param) === "[object Null]" || this.isType(param) === "[object Undefined]";
  };

  DOM.prototype.on = function on(evento, callback) {
    Array.prototype.forEach.call(this.element, function (item) {
      item.addEventListener(evento, callback, false)
    })
  }

  DOM.prototype.off = function off(evento, callback) {
    Array.prototype.forEach.call(this.element, function (item) {
      item.removeEventListener(evento, callback);
    })
  }

  DOM.prototype.get = function get(index) {
    if (!index){
      return this.element[0];
    }
      return this.element[index];

  }



  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
  }

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  }

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  }

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  }

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  }

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  }

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  }

  window.DOM = DOM



})(window, document)
