/**
 * @jsx React.DOM
 */
var React = require('react')
var ReactDOM = require('react-dom')

// flux + flux modules
var flux = require('../../flux')
var Game = require('../../modules/game')
var NuclearReactMixin = require('nuclear-react-mixin')
var StateViewer = require('../../components/state-viewer')

var ActionRemote = (props) => {
  return <ul>
    <li>
      <button onClick={Game.actions.down}>Down</button>
    </li>
    <li>
      <button onClick={Game.actions.left}>Left</button>
    </li>
    <li>
      <button onClick={Game.actions.right}>Right</button>
    </li>
    <li>
      <button onClick={Game.actions.rotate}>Rotate</button>
    </li>
    <li>
      <button onClick={Game.actions.softDrop}>Soft Drop</button>
    </li>
  </ul>
}

// render UI
ReactDOM.render(<StateViewer />, document.getElementById('state'))
ReactDOM.render(<ActionRemote />, document.getElementById('controls'))

window.flux = flux
window.Game = Game
