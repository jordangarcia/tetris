/**
 * @jsx React.DOM
 */
var React = require('react');

module.exports = React.createClass({

  render() {
    var style = {
      backgroundColor: 'rgba(255,255,255,.85)',
      color: 'black',
      position: 'absolute',
      top: '50%',
      width: '80%',
      marginLeft: '10%',
      padding: '10px',
      fontSize: 24,
      boxSizing: 'border-box',
      textAlign: 'center',
    }

    return <div style={style}>{this.props.message}</div>
  }
})
