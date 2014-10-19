/**
 * @jsx React.DOM
 */
var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <table>
        <tr>
          <td>Lines:</td>
          <td>{this.props.score.lines}</td>
        </tr>
        <tr>
          <td>Singles:</td>
          <td>{this.props.score.single}</td>
        </tr>
        <tr>
          <td>Doubles:</td>
          <td>{this.props.score.double}</td>
        </tr>
        <tr>
          <td>Triples:</td>
          <td>{this.props.score.triple}</td>
        </tr>
        <tr>
          <td>Tetrises:</td>
          <td>{this.props.score.tetris}</td>
        </tr>
      </table>
    )
  }
})
