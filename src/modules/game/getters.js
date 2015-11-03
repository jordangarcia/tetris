import { Immutable, toImmutable } from 'nuclear-js'
import { addPieceToBoard, getCoords, softDropPiece } from './helpers'

let { Map } = Immutable

/**
 * Combines the active piece with the current board and returns a Map keyed by coordinates
 * @return {Immutable.Map} coord => string (ex: 'I', 'L', 'J')
 */
exports.board = [
  ['game', 'activePiece'],
  ['game', 'board'],
  (piece, board) => {
    return (piece)
      ? addPieceToBoard(piece, board)
      : board
  },
];

exports.softDropCoords = [
  ['game', 'activePiece'],
  ['game', 'board'],
  (piece, board) => {
    if (!piece) {
      return toImmutable([])
    }
    return toImmutable(getCoords(softDropPiece(piece, board)))
  },
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
