var Nuclear = require('nuclear-js')

var reactor = Nuclear.createReactor()

reactor.attachCore('game', require('./cores/game-core'))
reactor.attachCore('pieces', require('./cores/pieces-core'))

reactor.bindActions('game', require('./actions/game-actions'))
reactor.bindActions('keybinds', require('./actions/keybind-actions'))

// computeds for the game status and score
// depending on the game type and win conditions these can could be computed differently
// and may not rely on the 'game' state.
reactor.computed('status', require('./getters/game-status'))
reactor.computed('score', require('./getters/score'))

module.exports = reactor
