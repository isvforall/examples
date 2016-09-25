
exports.start = function(that) {

  var memory = that.memory;
  var name = that.config.name;

  loop(decision);

  function getRandomIndex() {
    return Math.random() * memory.size;
  }

  /**
   * The function randomly solves to remove id or not
   */
  function solveToRemove() {
    return Math.random() < 0.5;
  }

  /**
   * Get random interval from 1 to 20 sec
   */
  function interval() {
    return (Math.rangom() * 20 + 1) * 1000;
  }

  /**
   * Infinite loop do something with random interval
   */
  function loop(doAgain) {
    var index = getRandomIndex();
    setInterval(function() {
      doAgain();
      loop(doAgain);
    }, interval());
  }

  function decision() {
    if (solveToRemove) {
      memory.remove(getRandomIndex());
    }
  }

};




