var React = require('react')

var boardHelper = require('../../modules/game/helpers/board-helper')
var pieceHelper = require('../../modules/game/helpers/piece-helper')
var Board = require('../../components/board')
var coord = require('../../modules/game/coord')
var BoardPiece = require('../../modules/game/board-piece')
var example = `var piece = new BoardPiece({
  type: 'I',
  rotation: 0,
  pos: coord(3, 3),
})

boardHelper.addPieceToBoard(piece, blankBoard);
`

module.exports = (props) => {
  var HEIGHT = 10;
  var WIDTH = 10;
  var blankBoard = boardHelper.generateBlankBoard(WIDTH, HEIGHT)
  var piece = new BoardPiece({
    type: 'I',
    rotation: 0,
    pos: coord(3, 3),
  })

  var board2 = boardHelper.addPieceToBoard(piece, blankBoard);

  return <table style={{ marginTop: 80 }}>
    <tbody>
      <tr>
        <td colSpan={2}>
          <pre>{example}</pre>
        </td>
      </tr>
      <tr>
        <td>
          <Board blocks={blankBoard} height={HEIGHT} width={WIDTH} />
        </td>
        <td>
          <Board blocks={board2} height={HEIGHT} width={WIDTH} />
        </td>
      </tr>
    </tbody>
  </table>
}
