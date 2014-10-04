var Nuclear = require('nuclear-js')

var reactor = Nuclear.createReactor()
reactor.attachCore('game', require('./game-core'))

reactor.bindActions('game', require('./game-actions'))

module.exports = reactor
