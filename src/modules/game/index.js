var flux = require('../../flux')

flux.registerStores({
  game: require('./stores/game-store'),
  pieceBag: require('./stores/piece-bag-store'),
})

exports.actions = require('./actions');

exports.getters = require('./getters');

exports.boardHelpers = require('./helpers/board-helper');

exports.pieceHelpers = require('./helpers/piece-helper');
