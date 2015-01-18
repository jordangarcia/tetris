/**
 * @jsx React.DOM
 */
var React = require('react');

var StateViewer = require('./components/state-viewer')
var Game = require('./components/game')

var BLOCK_SIZE = 20

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Game />
      </div>
    )
  }
})
