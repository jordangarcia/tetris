var React = require('react')
var PrismCode = require('react-prism').PrismCode;

// flux + flux modules
var boardHelper = require('../../modules/game/helpers/board-helper')
var pieceHelper = require('../../modules/game/helpers/piece-helper')
var Board = require('../../components/board')
var coord = require('../../modules/game/coord')
var BoardPiece = require('../../modules/game/board-piece')
var example = `var piece = new BoardPiece({
  type: 'I',
  rotation: 0,
  pos: coord(3, 3),
});
var board1 = boardHelper.addPieceToBoard(piece, blankBoard);

var newPiece = pieceHelper.move(piece, [0, -1]);
var board2 = boardHelper.addPieceToBoard(newPiece, blankBoard);
`

module.exports = (props) => {
  var WIDTH = 10;
  var HEIGHT = 10;
  var blankBoard = boardHelper.generateBlankBoard(WIDTH, HEIGHT)
  var piece = new BoardPiece({
    type: 'I',
    rotation: 0,
    pos: coord(3, 3),
  })

  var board1 = boardHelper.addPieceToBoard(piece, blankBoard);

  var newPiece = pieceHelper.move(piece, [0, -1]);
  var board2 = boardHelper.addPieceToBoard(newPiece, blankBoard);

  return <table style={{ marginTop: 80 }}>
    <tbody>
      <tr>
        <td colSpan={2}>
          <pre><PrismCode className="lang-javascript">{example}</PrismCode></pre>
        </td>
      </tr>
      <tr>
        <td style={{ width: 200 }}>
          <Board blocks={board1} height={HEIGHT} width={WIDTH} />
        </td>
        <td>
          <Board blocks={board2} height={HEIGHT} width={WIDTH} />
        </td>
      </tr>
    </tbody>
  </table>
}
