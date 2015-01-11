/**
 * @jsx React.DOM
 */
var React = require('react');

var Game = require('../../modules/game')
var flux = require('../../flux')
var NuclearReactMixin = require('nuclear-react-mixin')

var BLOCK_SIZE = 20

module.exports = React.createClass({

  mixins: [NuclearReactMixin(flux)],

  getDataBindings: function() {
    return {
      board: Game.getters.board
    }
  },

  render: function() {
    var boardWidth = 10 * BLOCK_SIZE
    var boardHeight = 22 * BLOCK_SIZE
    var boardStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -(boardHeight / 2),
      marginLeft: -(boardWidth / 2),
      height: boardHeight,
      width: boardWidth,
    }

    var blocks = this.state.board.map(function(piece, coord) {
      var style = {
        position: 'absolute',
        left: (coord.x * BLOCK_SIZE),
        bottom: (coord.y * BLOCK_SIZE)
      }
      piece = piece || '_'
      return <div style={style}>{piece}</div>
    }).toJS()

    return (
      <div style={boardStyle}>
        {blocks}
      </div>
    )
  }
})
