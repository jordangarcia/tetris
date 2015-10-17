var React = require('react')
var PrismCode = require('react-prism').PrismCode;

var boardHelper = require('../../modules/game/helpers/board-helper')
var pieceHelper = require('../../modules/game/helpers/piece-helper')
var Board = require('../../components/board')
var coord = require('../../modules/game/coord')

var example = `var lines = boardHelper.getLines(board1, WIDTH, HEIGHT);`

module.exports = (props) => {
  var HEIGHT = 10;
  var WIDTH = 10;
  var board1 = boardHelper.generateBoard(10, 10, [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [8, 1],
    [9, 1],
    [6, 2],
    [7, 2],
    [8, 2],
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [7, 3],
    [8, 3],
    [9, 3],
  ]);

  var lines = boardHelper.getLines(board1, 10, 10);

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
          <pre><PrismCode className="lang-javascript">{JSON.stringify(lines)}</PrismCode></pre>
        </td>
      </tr>
    </tbody>
  </table>
}
