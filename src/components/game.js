/**
 * @jsx React.DOM
 */
var React = require('react');

var Game = require('../modules/game')
var flux = require('../flux')

var BoardComponent = require('./board')

var BLOCK_SIZE = 20
var WIDTH = 10
var HEIGHT = 22
var BOARD_WIDTH = BLOCK_SIZE * WIDTH
var BOARD_HEIGHT = BLOCK_SIZE * HEIGHT

module.exports = React.createClass({

  mixins: [flux.ReactMixin],

  getDataBindings: function() {
    return {
      board: Game.getters.board,
    }
  },

  render: function() {
    var style = {
      width: BOARD_WIDTH,
      height: BOARD_HEIGHT,
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginTop: -(BOARD_HEIGHT / 2),
      marginLeft: -(BOARD_WIDTH / 2),
    };

    return <BoardComponent style={style} blocks={this.state.board} />
  }
})
