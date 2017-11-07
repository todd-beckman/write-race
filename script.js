var __GET__ = {};
for (var i = 0, _query = window.location.search.substring(1).split('&'); i < _query.length; i++) {
  var pair = _query[i].split('=');
  __GET__[pair[0]] = pair[1];
}

var Sprint = {
  // Constants
  textAreaPadding: 10, // in px

  // DOM elements
  barElement: null,
  barWrapperElement: null,
  goalElement: null,
  newGoalElement: null,
  textElement: null,

  // Variables
  goal: __GET__['goal'],

  calculateTextAreaHeight: function() {
    if (this.textElement == null) {
      return;
    }
    var textAreaHeight = (window.innerHeight) - (this.textElement.getBoundingClientRect().top) - this.textAreaPadding;
    this.textElement.style.height = textAreaHeight;
  },

  clear: function() {
    this.textElement.value = '';
  },
  
  getWordCount: function() {
    return this.textElement.value.trim().split(/\s+/).length;
  },

  resizeWcBar: function() {
    if (isNaN(this.goal) || this.goal < 1) {
      console.log('woops');
      return;
    }
    var fullWidth = this.barWrapperElement.offsetWidth;
    var progress = this.getWordCount() / this.goal;
    if (progress >= 1) {
      progress = 1;
      this.barElement.style.backgroundColor = '#FD3';
    }

    var width;
    if (progress == 0) {
      width = 0;
    } else {
      width = Math.ceil(fullWidth * progress);
    }

    this.barElement.style.width = width + 'px';
  },

  setGoal: function() {
    var newGoal = this.newGoalElement.value;
    if (isNaN(newGoal)) {
      return;
    }

    var base = window.location.href.substring('?')[0];
    window.location = location.pathname + '?goal=' + newGoal;

    this.goal = newGoal;
    this.goalElement.innerHTML = this.goal;
    this.resizeWcBar();
  },

  setUp: function() {
    this.barElement = document.getElementById('wcbar');
    this.barWrapperElement = document.getElementById('wcbarwrapper');
    this.goalElement = document.getElementById('goal');
    this.newGoalElement = document.getElementById('newgoal');
    this.textElement = document.getElementById('textarea');

    this.newGoalElement.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById("setgoal").click();
      }
    });

    if (isNaN(this.goal)) {
      this.goalElement.innerHTML = 'Not Set';
      this.textElement.style.display = 'none';
    } else {
      this.goalElement.innerHTML = this.goal + ' words';
    }

    this.calculateTextAreaHeight();
    window.addEventListener('resize', this.calculateTextAreaHeight.bind(this), true)
  }
};
