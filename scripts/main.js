var $ = document.querySelector.bind(document);

(function() {
  'use strict';

  var counter = 0;

  $('#catImage').addEventListener('click', function() {
    $('#counter').innerText = ++counter;
  });
})();
