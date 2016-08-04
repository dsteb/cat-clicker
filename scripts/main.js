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
      view.catList.init();
      $('#cat-img').addEventListener('click', function() {
        if (octopus.currentCat) {
          var counter = ++octopus.currentCat.counter;
          view.cat.render();
        }
      });
      this.currentCat = model.cats[0];
      view.cat.render();
      return this;
    },
    getCats: function() {
      return model.cats;
    },
    currentCat: null,
    onCatSelect: function() {
      if (octopus.currentCat === this) return;
      octopus.currentCat = this;
      view.cat.render();
    }
  };

  var view = {
    catList: {
      init: function() {
        var cats = octopus.getCats();
        cats.forEach(function(cat) {
          var li = document.createElement('li');
          var link = document.createElement('a');
          link.href = '#';
          link.textContent = cat.name ;
          link.addEventListener('click', octopus.onCatSelect.bind(cat));
          li.appendChild(link);
          $('#cat-list').appendChild(li);
        });
      }
    },
    cat: {
      render: function(cat) {
        if (!cat) cat = octopus.currentCat;
        $('.cat-name').forEach(function(el) {
          el.textContent = cat.name;
        });
        $('#cat-counter').textContent = cat.counter;
        var img = $('#cat-img');
        img.src = 'images/{0}.jpg'.format(cat.imageName);
      }
    }
  };

  octopus.init();
})();
