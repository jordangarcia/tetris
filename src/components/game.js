var React = require('react');

var flux = require('../flux')
var Game = require('../modules/game')
var BoardComponent = require('./board')

module.exports = React.createClass({

  mixins: [flux.ReactMixin],

  getDataBindings: function() {
    return {
      board: Game.getters.board,
      softDropCoords: Game.getters.softDropCoords,
    }
  },

  render: function() {
    return <BoardComponent
      board={this.state.board}
      softDropCoords={this.state.softDropCoords}
      blockSize={30} />
  }
})
