/**
 * @jsx React.DOM
 */
var React = require('react');
var ReactorMixin = require('nuclear-react-mixin')
var reactor = require('../../nuclear/reactor')
var _ = require('lodash')

module.exports = React.createClass({

  mixins: [ReactorMixin(reactor)],

  getDataBindings() {
    return {
      score: 'game.score',
    }
  },

  render() {
    return (
      <table>
        <tr>
          <td>Lines:</td>
          <td>{this.state.score.lines}</td>
        </tr>
        <tr>
          <td>Singles:</td>
          <td>{this.state.score.single}</td>
        </tr>
        <tr>
          <td>Doubles:</td>
          <td>{this.state.score.double}</td>
        </tr>
        <tr>
          <td>Triples:</td>
          <td>{this.state.score.triple}</td>
        </tr>
        <tr>
          <td>Tetrises:</td>
          <td>{this.state.score.tetris}</td>
        </tr>
      </table>
    )
  }
})
