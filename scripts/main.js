var $ = document.querySelector.bind(document);

(function() {
  'use strict';

  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/, function(m, i) {
        return args[i] ? args[i] : m;
      });
    };
  }

  var gioaCounter = 0;
  $('#gioa-img').addEventListener('click', function() {
    $('#gioa-counter').innerText = ++gioaCounter;
  });

  var brunoCounter = 0;
  $('#bruno-img').addEventListener('click', function() {
    $('#bruno-counter').innerText = ++brunoCounter;
  });

})();
