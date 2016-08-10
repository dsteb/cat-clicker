(function() {
  'use strict';

  var $ = function(selector) {
    var elements = document.querySelectorAll(selector);
    return elements.length === 1 ? elements[0] : elements;
  };

  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/, function(m, i) {
        return args[i] ? args[i] : m;
      });
    };
  }

  var ViewModel = function() {
    this.cat = {
      name: 'ЖуЖу',
      imageSrc: 'images/black-white.jpg',
      counter: ko.observable(0)
    };
    this.incrementClickCounter = function() {
      this.cat.counter(this.cat.counter() + 1);
    };
  };

  ko.applyBindings(new ViewModel());
})();
