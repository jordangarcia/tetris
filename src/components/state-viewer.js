/**
 * @jsx React.DOM
 */
var React = require('react')
// flux + flux modules
var flux = require('../flux')
var Game = require('../modules/game')
var NuclearReactMixin = require('nuclear-react-mixin')
var StateViewer = require('../components/state-viewer')

module.exports = React.createClass({
  mixins: [NuclearReactMixin(flux)],

  getDataBindings: function() {
    return {
      gameStateString: Game.getters.gameStateString
    }
  },

  render: function() {
    return (
      <div>
        <pre>{this.state.gameStateString}</pre>
      </div>
    )
  }
})
