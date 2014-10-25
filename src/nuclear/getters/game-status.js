var Nuclear = require('nuclear-js')

module.exports = Nuclear.Getter({
  deps: ['game.isOver', 'game.isPaused'],
  compute(isOver, isPaused) {
    if (isOver) {
      return 'over'
    } else if (isPaused) {
      return 'paused'
    } else {
      return 'running'
    }
  }
})
