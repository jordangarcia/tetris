var Nuclear = require('nuclear-js')

var reactor = Nuclear.createReactor()

reactor.attachCore('game', require('./game-core'))
reactor.attachCore('pieces', require('./pieces-core'))
reactor.bindActions('game', require('./game-actions'))
reactor.bindActions('keybinds', require('./keybind-actions'))

module.exports = reactor
