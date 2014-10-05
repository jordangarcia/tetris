var Nuclear = require('nuclear-js')
var Immutable = require('immutable')
var Const = require('./constants')
var Tetriminos = require('../tetriminos')

/**
 * The core that tracks the state of the board
 */
module.exports = Nuclear.createCore({
  initialize() {
    this.on(Const.SPAWN_PIECE, nextPiece)

    return {
      next: randomPiece()
    }
  }
})

function nextPiece(state) {
  return state.set('next', randomPiece())
}

function randomPiece() {
  return Tetriminos.pieces[randInt(7)]
}

/**
 * Generates random number 0 to (max - 1)
 */
function randInt(max) {
 return Math.floor((Math.random() * max))
}
