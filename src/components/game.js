var React = require('react');

var flux = require('../flux')
var Game = require('../modules/game')
var BoardComponent = require('./board')

module.exports = React.createClass({

  mixins: [flux.ReactMixin],

  getDataBindings: function() {
    return {
      board: Game.getters.board,
    }
  },

  render: function() {
    return <BoardComponent board={this.state.board} blockSize={30} />
  }
})
