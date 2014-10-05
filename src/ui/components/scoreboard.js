/**
 * @jsx React.DOM
 */
var React = require('react');
var reactor = require('../../nuclear/reactor')
var _ = require('lodash')

function getState() {
  return {
    score: reactor.get('game.score')
  }
}

module.exports = React.createClass({

  getInitialState() {
    return getState()
  },

  componentDidMount() {
    this._changeObserver = reactor.createChangeObserver()
    this._changeObserver.onChange(['game.score'], score => {
      this.setState(getState())
    })
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
