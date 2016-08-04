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

  var model = {
    currentCat: null,
    cats: [
      {
        name: 'Васька',
        imageName: 'kitty',
        counter: 0
      }, {
        name: 'Бруно',
        imageName: 'hidden-cat',
        counter: 0
      }, {
        name: 'Тася',
        imageName: 'tay-cat',
        counter: 0
      }, {
        name: 'Тося',
        imageName: 'bold-cat',
        counter: 0
      }, {
        name: 'Жужу',
        imageName: 'black-white',
        counter: 0
      }]
  };

  var octopus = {
    init: function() {
      catListView.init();
      $('#cat-img').addEventListener('click', octopus.increaseCounter);
      model.currentCat = model.cats[0];
      catView.render(model.currentCat);
      var target = $('#cat-list > li:first-child > a');
      catListView.select(target);
    },
    getCats: function() {
      return model.cats;
    },
    increaseCounter: function() {
      var currentCat = model.currentCat;
      if (currentCat) {
        ++currentCat.counter;
        catView.render(currentCat);
      }
    },
    setCurrentCat: function(cat) {
      if (model.currentCat === cat) return false;
      model.currentCat = cat;
      return true;
    }
  };

  var catListView = {
    init: function() {
      var cats = octopus.getCats();
      cats.forEach(function(cat) {
        var li = document.createElement('li');
        var link = document.createElement('a');
        link.href = '#';
        link.textContent = cat.name ;
        link.addEventListener('click', (function(cat) {
          return function(e) {
            if (octopus.setCurrentCat(cat)) {
              catView.render(cat);
              catListView.select(e.target);
            }
          };
        })(cat));
        li.appendChild(link);
        $('#cat-list').appendChild(li);
      });
    },
    select: function(a) {
      $('.selected').className = '';
      a.className = 'selected';
    }
  };

  var catView = {
    render: function(cat) {
      $('.cat-name').forEach(function(el) {
        el.textContent = cat.name;
      });
      $('#cat-counter').textContent = cat.counter;
      $('#cat-img').src = 'images/{0}.jpg'.format(cat.imageName);
    }
  };

  octopus.init();
})();
