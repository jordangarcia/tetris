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
    var style = {
      margin: 'auto',
    };
    return <BoardComponent style={style} board={this.state.board} />
  }
})
