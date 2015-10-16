var React = require('react')

// flux + flux modules
var Game = require('../../modules/game')
var Board = require('../../components/board')

var example = `Game.boardHelpers.generateBlankBoard(10, 10);`

module.exports = (props) => {
  var board1 = Game.boardHelpers.generateBlankBoard(10, 10);

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
