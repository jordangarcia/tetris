/**
 * @jsx React.DOM
 */
var React = require('react');
var reactor = require('../../nuclear/reactor')
var game = reactor.action('game')

module.exports = React.createClass({
  render() {
    return (
      <div>
        <button onClick={game.tick}>Tick</button>
        <button onClick={game.moveLeft}>Left</button>
        <button onClick={game.moveRight}>Right</button>
        <button onClick={game.rotateClockwise}>Rotate</button>
      </div>
    )
  }
})
