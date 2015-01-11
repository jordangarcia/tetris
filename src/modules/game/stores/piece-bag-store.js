var Nuclear = require('nuclear-js')
var Map = Nuclear.Immutable.Map
var Sequence = require('immutable').Sequence
var actionTypes = require('../action-types')
var Tetriminos = require('../tetriminos')

// TODO: for some reason Immutable.IndexedSequence.get() isnt working
// must coerce to Vector
var pieces = Sequence(Tetriminos.pieces).toVector()

/**
 * The core that tracks the state of the board
 */
module.exports = Nuclear.Store({
  initialize: function() {
    this.on(actionTypes.SPAWN_PIECE, nextPiece)
  },

  getInitialState: function() {
    return nextPiece(Map({
      next: null,
      remaining: pieces
    }))
  },
})

/**
 * Pick from the bag of remaining pieces, if the bag is empty
 * refill
 */
function nextPiece(state) {
  return state.withMutations(state => {
    var remaining = state.get('remaining')
    var ind = randInt(remaining.length)

    state.set('next', remaining.get(ind))
    state.set('remaining', remaining.splice(ind, 1))

    if (state.get('remaining').length === 0) {
      state.set('remaining', pieces)
    }

    return state
  })
}

/**
 * Generates random number 0 to (max - 1)
 */
function randInt(max) {
 return Math.floor((Math.random() * max))
}