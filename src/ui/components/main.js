/**
 * @jsx React.DOM
 */
var React = require('react');
var Board = require('./board');
var Side = require('./side');

var ReactorMixin = require('nuclear-react-mixin')
var reactor = require('../../nuclear/reactor')

module.exports = React.createClass({

  mixins: [ReactorMixin(reactor)],

  getDataBindings() {
    return {
      'board': 'game.board',
      'isOver': 'game.isOver',
      'isPaused': 'game.isPaused',
      'softDrop': 'game.softDropCoords',
    }
  },

  render() {
    return (
      <div>
        <Board
          board={this.state.board}
          isOver={this.state.isOver}
          isPaused={this.state.isPaused}
          softDrop={this.state.softDrop}
        />
        <Side />
      </div>
    )
  }
})
