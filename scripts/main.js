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

  var Cat = function(name) {
    this.name = name;
    this.img = 'images/{0}.jpg'.format(name.toLowerCase());

    var container = document.createElement('div');
    container.className += 'cat';

    var headerEl = document.createElement('h2');
    var header = 'Click {0}!'.format(name);
    headerEl.innerText = header;

    var img = document.createElement('img');
    img.className += 'img-responsive clickable';
    img.id = name.toLowerCase() + '-img';
    img.src = this.img;
    img.alt = 'Kitty ' + name;
    img.title = 'Click me please!';

    var counterBlock = document.createElement('div');
    counterBlock.innerText = '{0} clicker: '.format(name);

    var counter = 0;
    var counterEl = document.createElement('em');
    counterEl.innerText = counter;

    img.addEventListener('click', function() {
      counterEl.innerText = ++counter;
    });

    counterBlock.appendChild(counterEl);

    container.appendChild(headerEl);
    container.appendChild(img);
    container.appendChild(counterBlock);

    $('#cats').appendChild(container);
  };

  new Cat('Gioa');
  new Cat('Bruno');
  // var gioaCounter = 0;
  // $('#gioa-img').addEventListener('click', function() {
  //   $('#gioa-counter').innerText = ++gioaCounter;
  // });
  //
  // var brunoCounter = 0;
  // $('#bruno-img').addEventListener('click', function() {
  //   $('#bruno-counter').innerText = ++brunoCounter;
  // });

})();
