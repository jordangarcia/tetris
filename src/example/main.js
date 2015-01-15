/**
 * @jsx React.DOM
 */
var React = require('react')

// flux + flux modules
var flux = require('../flux')
var Game = require('../modules/game')
var NuclearReactMixin = require('nuclear-react-mixin')

var StateViewer = React.createClass({
  mixins: [NuclearReactMixin(flux)],

  getDataBindings: function() {
    return {
      gameStateString: [
        ['game'],
        function(gameMap) {
          var gameState = gameMap.toJS()
          return JSON.stringify(gameState, null, '  ')
        }
      ]
    }
  },

  render: function() {
    return <pre>{this.state.gameStateString}</pre>
  }
})

var ActionRemote = React.createClass({
  mixins: [NuclearReactMixin(flux)],

  getDataBindings: function() {
    return {
      gameStateString: [
        ['game'],
        function(gameMap) {
          return gameMap.toString()
        }
      ]
    }
  },

  doAction: function(action) {
    Game.actions[action]()
  },

  render: function() {
    return (
      <ul>
        <li>
          <button onClick={this.doAction.bind(this, 'down')}>Down</button>
        </li>
        <li>
          <button onClick={this.doAction.bind(this, 'left')}>Left</button>
        </li>
        <li>
          <button onClick={this.doAction.bind(this, 'right')}>Right</button>
        </li>
        <li>
          <button onClick={this.doAction.bind(this, 'rotate')}>Rotate</button>
        </li>
      </ul>
    )
  }
})

// render UI
React.renderComponent(<StateViewer />, document.getElementById('state'))
React.renderComponent(<ActionRemote />, document.getElementById('controls'))

window.flux = flux
window.Game = Game
