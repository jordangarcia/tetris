var Immutable = require('nuclear-js').Immutable
var boardHelper = require('./helpers/board-helper')

/**
 * Combines the active piece with the current board and returns a Map keyed by coordinates
 *
 * @return {Immutable.Map} coord => string (ex: 'I', 'L', 'J')
 */
exports.board = [
  ['game', 'activePiece'],
  ['game', 'board'],
  function(piece, board) {
    // TODO
    if (!piece) {
      return board
    }
    return boardHelper.addPieceToBoard(piece, board)
  }
];

/**
 * @return {string} game
 */
exports.status = [
  ['game', 'isOver'],
  ['game', 'isPaused'],
  function(isOver, isPaused) {
    if (isOver) {
      return 'over'
    } else if (isPaused) {
      return 'paused'
    } else {
      return 'running'
    }
  }
];

/**
 * @return {boolean} should spawn a new piece
 */
exports.shouldSpawnPiece = [
  ['game', 'activePiece'],
  (piece) => !piece,
];

/**
 * @return {string} piece key
 */
exports.nextPiece = ['pieceBag', 'next'];

/**
 * @return {object} score
 */
exports.score = [
  ['game', 'clears'],
  /**
   * @param {array<number>} clears history of all line clears
   */
  function(clears) {
    var score = {
      lines: 0,
      single: 0,
      double: 0,
      triple: 0,
      tetris: 0,
    }

    clears.forEach(num => {
      score.lines += num
      switch(num) {
        case 1:
          score.single++
          break
        case 2:
          score.double++
          break
        case 3:
          score.triple++
          break
        case 4:
          score.tetris++
          break
      }
    })

    return score
  }
];
