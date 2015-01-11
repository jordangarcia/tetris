/**
 * @jsx React.DOM
 */
var React = require('react');

var Game = require('../../modules/game')
var flux = require('../../flux')
var NuclearReactMixin = require('nuclear-react-mixin')

var Block = require('./block');

var BLOCK_SIZE = 32
var WIDTH = 10
var HEIGHT = 22

module.exports = React.createClass({

  mixins: [NuclearReactMixin(flux)],

  getDataBindings() {
    return {
      board: Game.getters.board
    }
  },

  render() {
    var style = {
      float: 'left',
      backgroundColor: '#ccc',
      height: (BLOCK_SIZE * HEIGHT),
      width: (BLOCK_SIZE * WIDTH),
      position: 'relative',
    }

    var previewBlocks = this.props.softDrop
      .map(coord => {
        return Block({
          color: '#888',
          x: coord.x,
          y: coord.y,
          size: BLOCK_SIZE
        })
      })

    var realBlocks = this.props.board
      .filter(x => x !== null)
      .map((val, coord) => {
        return Block({
          color: 'black',
          x: coord.x,
          y: coord.y,
          size: BLOCK_SIZE
        })
      }).toVector().toJS()

    var children = []
      .concat(previewBlocks)
      .concat(realBlocks)

    var props = {
      style: style
    }

    return React.DOM.div(props, children)
  }
})
