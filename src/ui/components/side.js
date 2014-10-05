/**
 * @jsx React.DOM
 */
var React = require('react');
var ScoreBoard = require('./scoreboard');
var NextPiece = require('./next-piece');

module.exports = React.createClass({
  render() {
    var style = {
      marginLeft: 20,
      float: 'left',
    }

    return (
      <div style={style}>
        <NextPiece />
        <ScoreBoard />
      </div>
    )
  }
})
