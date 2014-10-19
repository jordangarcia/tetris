var Nuclear = require('nuclear-js')

var reactor = Nuclear.createReactor()

reactor.computed(
  'keybind',
  ['game.isOver', 'game.isPaused'],
  (isOver, isPaused) => {
    if (isOver) {
      return 'gameOver'
    } else if (isPaused) {
      return 'paused'
    } else {
      return 'game'
    }
  })

reactor.attachCore('game', require('./game-core'))
reactor.attachCore('pieces', require('./pieces-core'))
reactor.bindActions('game', require('./game-actions'))

module.exports = reactor
