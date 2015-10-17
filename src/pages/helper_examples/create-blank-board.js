var React = require('react')

var boardHelper = require('../../modules/game/helpers/board-helper')
var pieceHelper = require('../../modules/game/helpers/piece-helper')
var Board = require('../../components/board')

var example = `boardHelpers.generateBlankBoard(10, 10);`

module.exports = (props) => {
  var board1 = boardHelper.generateBlankBoard(10, 10);

  return <table>
    <tbody>
      <tr>
        <td colSpan={2}>
          <pre>{example}</pre>
        </td>
      </tr>
      <tr>
        <td>
          <Board blocks={board1} height={10} width={10} />
        </td>
        <td>
        </td>
      </tr>
    </tbody>
  </table>
}
