var Nuclear = require('nuclear-js')
var flux = require('../../flux')

flux.registerStores({
  game: require('./stores/game-store'),
  pieceBag: require('./stores/piece-bag-store'),
})

module.exports = {
  actions: require('./actions'),

  getters: require('./getters'),
}
