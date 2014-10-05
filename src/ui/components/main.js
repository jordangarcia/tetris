/**
 * @jsx React.DOM
 */
var React = require('react');
var Controls = require('./controls');
var Board = require('./board');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <Controls />
        <Board />
      </div>
    )
  }
})
