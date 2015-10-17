var React = require('react')

var flux = require('../flux')
var Game = require('../modules/game')
var StateViewer = require('../components/state-viewer')
var boardHelper = require('../modules/game/helpers/board-helper')

module.exports = React.createClass({

  mixins: [flux.ReactMixin],

  getDataBindings: function() {
    return {
      gameStateString: [
        ['game'],
        [
          ['game', 'activePiece'],
          ['game', 'board'],
          function(piece, board) {
            if (!piece) {
              return board
            }
            return boardHelper.addPieceToBoard(piece, board)
          }
        ],
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
      ]
    }
  },

  render: function() {
    return (
      <div>
        <pre>{this.state.gameStateString}</pre>
      </div>
    )
  }
})
