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

  var currentCat = null;

  var Cat = function(name, imageName) {
    this.name = name;
    this.img = 'images/{0}.jpg'.format(imageName);
    this.counter = 0;

    var li = document.createElement('li');
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = name;
    link.addEventListener('click', this.onSelect.bind(this));
    li.appendChild(link);
    $('#cat-list').appendChild(li);
  };

  Cat.prototype.onSelect = function() {
    if (currentCat === this) return;
    if (currentCat) {
      currentCat.onUnselect();
    }
    currentCat = this;
    var cat = this;
    $('.cat-name').forEach(function(el) {
      el.textContent = cat.name;
    });
    $('#cat-counter').textContent = this.counter;
    var img = $('#cat-img');
    img.src = this.img;
    $('#cat-counter').textContent = this.counter;
    this.clickHandler = function() {
      $('#cat-counter').textContent = ++cat.counter;
    };
    img.addEventListener('click', this.clickHandler);
  };

  Cat.prototype.onUnselect = function() {
    $('#cat-img').removeEventListener('click', this.clickHandler);
  };

  new Cat('Васька', 'kitty').onSelect();
  new Cat('Бруно', 'hidden-cat');
  new Cat('Тася', 'tay-cat');
  new Cat('Тося', 'bold-cat');
  new Cat('Жужу', 'black-white');
})();
