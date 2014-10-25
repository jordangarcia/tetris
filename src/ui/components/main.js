/**
 * @jsx React.DOM
 */
var React = require('react');
var Board = require('./board');
var NextPiece = require('./next-piece');
var Scoreboard = require('./scoreboard');

var ReactorMixin = require('nuclear-react-mixin')
var reactor = require('../../nuclear/reactor')

module.exports = React.createClass({

  mixins: [ReactorMixin(reactor)],

  getDataBindings() {
    return {
      board: 'game.board',
      isOver: 'game.isOver',
      isPaused: 'game.isPaused',
      nextPiece: 'pieces.next',
      score: 'score',
      softDrop: 'game.softDropCoords',
    }
  },

  render() {
    var sidebarStyle = {
      marginLeft: 20,
      float: 'left'
    }

    return (
      <div>
        <Board
          board={this.state.board}
          isOver={this.state.isOver}
          isPaused={this.state.isPaused}
          softDrop={this.state.softDrop}
        />
        <div style={sidebarStyle}>
          <NextPiece piece={this.state.nextPiece} />
          <Scoreboard score={this.state.score} />
        </div>
      </div>
    )
  }
})
