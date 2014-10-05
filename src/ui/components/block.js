var React = require('react');

module.exports = React.createClass({
  render() {
    var style = {
      width: this.props.size,
      height: this.props.size,
      left: (this.props.x * this.props.size),
      bottom: (this.props.y * this.props.size),
      backgroundColor: 'black',
      position: 'absolute',
    }
    return React.DOM.div({
      style: style
    })
  }
})
