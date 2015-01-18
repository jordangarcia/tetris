var boardHelper = require('./helpers/board-helper')

var boardGetter = [
  ['game', 'activePiece'],
  ['game', 'board'],
  function(piece, board) {
    if (!piece) {
      return board
    }
    return boardHelper.addPieceToBoard(piece, board)
  }
]

var activeMolecule = [
  ['ui', 'selectedNode'],
  ['molecules'],
  function(node, molecues) {
    return findMoleculeFromNode(molecues, node)
  }
]


var getDataAtNode = [
  ['ui', 'selectedNode'],
  [
    ['ui', 'selectedNode'],
    ['molecules'],
    function(node, molecues) {
      return findMoleculeFromNode(molecues, node)
    }
  ],
  function(selectedNode, molecule) {
    return getDataAtMolecule(molecule, selectedNode)
  }
]















module.exports = {
  /**
   * Combines the active piece with the current board and returns a Map keyed by coordinates
   *
   * @return {Immutable.Map} coord => string (ex: 'I', 'L', 'J')
   */
  board: boardGetter,

  /**
   * @return {string} game
   */
  status: [
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
  ],

  /**
   * @return {boolean} should spawn a new piece
   */
  shouldSpawnPiece: [
    ['game', 'activePiece'],
    function(piece) {
      return !piece
    }
  ],

  /**
   * @return {string} piece key
   */
  nextPiece: ['pieceBag', 'next'],

  /**
   * @return {object} score
   */
  score: [
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
  ],

  gameStateString: [
    ['game'],
    boardGetter,
    function(gameMap, board) {
      var gameState = gameMap.toJS()
      delete gameState.board
      var plane = []
      var res = {}
      board.forEach(function(val, coord) {
        if (plane[coord.y] === undefined) {
          plane[coord.y] = []
        }
        plane[coord.y][coord.x] = val
      })

      plane.forEach(function(xs, y) {
        xs.forEach(function(val, x) {
          res['y=' + y + ', x=' + x] = val
        })
      })
      gameState.board = res
      return JSON.stringify(gameState, null, '  ')
    }
  ],
}
