/**
 * @jsx React.DOM
 */
var React = require('react');
var Board = require('./board');
var Side = require('./side');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <Board />
        <Side />
      </div>
    )
  }
})
