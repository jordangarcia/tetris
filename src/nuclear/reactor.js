var Nuclear = require('nuclear-js')

var reactor = Nuclear.createReactor()
reactor.attachCore('board', require('./board-core'))

reactor.bindActions('game', require('./game-actions'))

module.exports = reactor
