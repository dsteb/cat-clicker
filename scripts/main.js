var $ = document.querySelector.bind(document);

(function() {
  'use strict';

  var gioaCounter = 0;
  $('#gioa-img').addEventListener('click', function() {
    $('#gioa-counter').innerText = ++gioaCounter;
  });

  var brunoCounter = 0;
  $('#bruno-img').addEventListener('click', function() {
    $('#bruno-counter').innerText = ++brunoCounter;
  });

})();
