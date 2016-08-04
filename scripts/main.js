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
        image: 'images/kitty.jpg',
        counter: 0
      }, {
        name: 'Бруно',
        image: 'images/hidden-cat.jpg',
        counter: 0
      }, {
        name: 'Тася',
        image: 'images/tay-cat.jpg',
        counter: 0
      }, {
        name: 'Тося',
        image: 'images/bold-cat.jpg',
        counter: 0
      }, {
        name: 'Жужу',
        image: 'images/black-white.jpg',
        counter: 0
      }],
  };

  var octopus = {
    init: function() {
      catListView.init();
      $('#cat-image').addEventListener('click', octopus.increaseCounter);
      model.currentCat = model.cats[0];
      catView.render(model.currentCat);
      adminView.render(model.currentCat);
      var target = $('#cat-list > li:first-child > a');
      catListView.select(target);
      adminView.init();
    },
    getCats: function() {
      return model.cats;
    },
    increaseCounter: function() {
      var currentCat = model.currentCat;
      if (currentCat) {
        ++currentCat.counter;
        catView.render(currentCat);
        adminView.render(currentCat);
      }
    },
    setCurrentCat: function(cat) {
      if (model.currentCat === cat) return false;
      model.currentCat = cat;
      return true;
    },
    updateCurrentCat: function(newName, newImage, newCounter) {
      var cat = model.currentCat;
      cat.name = newName;
      cat.image = newImage;
      cat.counter = newCounter;
      catView.render(cat);
    },
    closeAdmin: function() {
      adminView.hide();
      adminView.render(model.currentCat);
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
              adminView.render(cat);
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
      $('#cat-image').src = cat.image;
    }
  };

  var adminView = {
    init: function() {
      $('#admin-btn').addEventListener('click', adminView.show);
      $('#admin-save-btn').addEventListener('click', function() {
        var newName = $('#cat-name-input').value;
        var newImage = $('#cat-image-input').value;
        var newCounter = parseInt($('#cat-counter-input').value);
        octopus.updateCurrentCat(newName, newImage, newCounter);
      });
      $('#admin-cancel-btn').addEventListener('click', octopus.closeAdmin);
    },
    show: function() {
      $('#admin-section').style = '';
    },
    hide: function() {
      $('#admin-section').style = 'display: none;';
    },
    render: function(cat) {
      $('#cat-name-input').value = cat.name;
      $('#cat-image-input').value = cat.image;
      $('#cat-counter-input').value = cat.counter;
    }
  };

  octopus.init();
})();
