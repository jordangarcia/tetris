import { isArray, uniq, range } from 'lodash'
import { Immutable } from 'nuclear-js'
import { Piece } from './records'
import Tetriminos from './tetriminos'

let { Map, List } = Immutable

/**
 * Generates an Immutable Map with [x, y] coords as keys
 *
 * Can be passed optional third parameter of existing piece
 * existing: [
 *   [[0, 0], 'I'],
 *   [[1, 0], 'J'],
 * ]
 */
export function createBoard(width, height, existing = []) {
  const col = List().withMutations(list => {
    for (let y = 0; y < height; y++) {
      list.push(null)
    }
  })

  const board = List().withMutations(board => {
    for (let x = 0; x < width; x++) {
      board.push(col)
    }
  })

  if (existing.length > 0) {
    return board.withMutations(board => {
      existing.forEach(([coord, pieceType]) => {
        board.setIn(coord, pieceType)
      })
    })
  }

  return board
}

/**
 * @param {Piece} piece
 * @param {Immutable.List} board
 * @return {Boolean}
 */
export function isValidPosition(piece, board) {
  return getCoords(piece).every(coord => {
    // special case since board.get(-1) doesnt return undefined
    if (coord[0] < 0) {
      return false
    }
    return board.getIn(coord, false) === null
  })
}

/**
 * Gets the coordinates for a piece and adds to the returned board
 * @param {Piece} piece
 * @param {Immutable.List} board
 * @return {Immutable.List}
 */
export function addPieceToBoard(piece, board) {
  return board.withMutations(board => {
    getCoords(piece).forEach(coord => {
      board.setIn(coord, piece.type)
    })
  })
}

/**
 * Returns an array of all Y values that are lines
 */
export function getLines(board) {
  const [width, height] = getBoardDimensions(board)

  return range(height).filter(y => {
    return range(width).every(x => {
      return board.getIn([x, y]) !== null;
    })
  })
}

/**
 * Returns a new board state with a specific row nulled out
 */
export function removeLines(board, toRemove) {
  const [width, height] = getBoardDimensions(board)
  let numRemoved = 0

  return board.withMutations(board => {
    toRemove.forEach(yVal => {
      let y = yVal - numRemoved
      let vertRange = []
      for (var i = y+1; i < height; i++) {
        vertRange.push(i)
      }

      vertRange.forEach(y => {
        range(width).forEach(x => {
          let pos = [x, y]
          let existing = board.getIn(pos)
          let replacePos = [x, y - 1]
          board.setIn(replacePos, existing)
          // backfill top
          const topPos = [x, height - 1]
          board.setIn(topPos, null)
        })
      })

      numRemoved++
    })

    return board
  })
}

/**
 * Returns a BoardPiece with the location of the piece after a soft
 * drop
 */
export function softDropPiece(piece, board) {
  let newPiece = piece
  let deltaY = 0
  // move the piece down until its no longer valid
  while (isValidPosition(newPiece, board)) {
    deltaY--
    newPiece = move(piece, [0, deltaY])
  }

  // move one above the invalid position
  return move(piece, [0, deltaY + 1])
}

/**
 * Takes an inputted BoardPiece and rotates it some number of turns
 * can be rotated counter clockwise by passing a negative diff
 * @param {BoardPiece} piece
 * @param {number} diff
 * @return {BoardPiece}
 */
export function rotate(piece, diff) {
  const rotationLen = Tetriminos[piece.type].structure.length
  const newRotation = (piece.rotation + diff) % rotationLen

  return new Piece({
    type: piece.type,
    rotation: newRotation,
    pos: piece.pos,
  })
}

/**
 * Returns a new BoardPiece that has been moved down one
 * Returns the position of a board piece if moved down one
 * @param {BoardPiece} piece
 */
export function move(piece, vector) {
  const [x, y] = piece.pos
  const [dX, dY] = vector
  const newPos = [x + dX, y + dY]

  return new Piece({
    type: piece.type,
    rotation: piece.rotation,
    pos: newPos,
  })
}

/**
 * Flattens the 2d board structure into a 1d Map of coord => string where it only has non-null
 * values
 */
export function flattenAndFilterBoard(board) {
  return Map().withMutations(map => {
    board.forEach((col, x) => {
      col.forEach((val, y) => {
        if (val) {
          map.set([x, y], val)
        }
      })
    })
  })
}

export function getBoardDimensions(board) {
  const width = board.size
  const height = board.get(0).size
  return [width, height]
}

/**
 * @param {BoardPiece} piece
 * @return {Array}
 */
function getCoords(piece) {
  const { structure } = Tetriminos[piece.type]
  const rotation = piece.rotation % structure.length

  return structure[rotation].map(([x1, y1]) => {
    const [x2, y2] = piece.pos
    return [x1 + x2, y1 + y2]
  })
}

