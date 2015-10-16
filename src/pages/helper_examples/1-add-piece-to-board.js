var React = require('react')

// flux + flux modules
var Game = require('../../modules/game')
var Board = require('../../components/board')
var coord = require('../../modules/game/coord')
var BoardPiece = require('../../modules/game/board-piece')
var example = `var piece = new BoardPiece({
  type: 'I',
  rotation: 0,
  pos: coord(3, 3),
})

Game.boardHelpers.addPieceToBoard(piece, board1);
`

module.exports = (props) => {
  var HEIGHT = 10;
  var WIDTH = 10;
  var board1 = Game.boardHelpers.generateBlankBoard(WIDTH, HEIGHT)
  var piece = new BoardPiece({
    type: 'I',
    rotation: 0,
    pos: coord(3, 3),
  })

  var board2 = Game.boardHelpers.addPieceToBoard(piece, board1);

  return <table style={{ marginTop: 80 }}>
    <tbody>
      <tr>
        <td colSpan={2}>
          <pre>{example}</pre>
        </td>
      </tr>
      <tr>
        <td>
          <Board blocks={board1} height={HEIGHT} width={WIDTH} />
        </td>
        <td>
          <Board blocks={board2} height={HEIGHT} width={WIDTH} />
        </td>
      </tr>
    </tbody>
  </table>
}
