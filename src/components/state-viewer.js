import { Immutable } from 'nuclear-js'
var React = require('react')

var flux = require('../flux')
var Game = require('../modules/game')

module.exports = React.createClass({

  mixins: [flux.ReactMixin],

  getDataBindings: function() {
    return {
      gameStateString: [
        Game.getters.board,
        (board) => {
          const boardJS = board.toJS()
          const mappedRows = boardJS.map(col => {
            return JSON.stringify(col)
          })
          return mappedRows.join("\n")
          //return JSON.stringify(mappedRows, null, '  ')
          const map = Immutable.Map().withMutations(map => {
            board.forEach((col, x) => {
              col.forEach((val, y) => {
                  map.set([x, y], val)
              })
            })
          })
          return JSON.stringify(map, null, '  ')

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
