var Nuclear = require('nuclear-js')

var reactor = Nuclear.createReactor()
reactor.attachCore('game', require('./game-core'))
reactor.attachCore('timer', require('./timer-core'))

reactor.bindActions('game', require('./game-actions'))
reactor.bindActions('timer', require('./timer-actions'))

module.exports = reactor
