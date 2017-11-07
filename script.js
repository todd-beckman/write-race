var __GET__ = {};
for (var i = 0, _query = window.location.search.substring(1).split('&'); i < _query.length; i++) {
  var pair = _query[i].split('=');
  __GET__[pair[0]] = pair[1];
}

var Sprint = {
  // DOM elements
  barElement: null,
  barWrapperElement: null,
  goalElement: null,
  textElement: null,

  // Variables
  goal: __GET__['goal'],

  setUp: function() {
    this.barElement = document.getElementById("wcbar");
    this.barWrapperElement = document.getElementById("wcbarwrapper");
    this.goalElement = document.getElementById("goal");
    this.textElement = document.getElementById("textarea");

    if (isNaN(this.goal)) {
      this.goalElement.innerHTML = 'Not Set';
    } else {
      this.goalElement.innerHTML = this.goal;
    }
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
      this.barElement.style.backgroundColor = '#CCCC44';
    }

    var width = Math.ceil(fullWidth * progress) + 'px';
    console.log(progress);
    this.barElement.style.width = Math.ceil(fullWidth * progress) + 'px';
  },

  setGoal: function() {
    var newGoal = document.getElementById('newgoal').value;
    if (isNaN(newGoal)) {
      return;
    }

    var base = window.location.href.substring('?')[0];
    window.location = location.pathname + '?goal=' + newGoal;

    this.goal = newGoal;
    this.goalElement.innerHTML = this.goal;
    this.resizeWcBar();
  }
};
