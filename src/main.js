/**
 * @jsx React.DOM
 */
var React = require('react')
var reactor = require('./nuclear/reactor')
var Main = require('./ui/components/main')
var Timer = require('./timer')

var LOOP_TIME = 1000
var UP_ARROW = 38
var LEFT_ARROW = 37
var DOWN_ARROW = 40
var RIGHT_ARROW = 39
var ESCAPE_KEY = 27
var SPACE_KEY = 32

// render UI
React.renderComponent(<Main />, document.getElementById('main'))

// setup game timer
var gameTimer = new Timer()
gameTimer.onTick(() => {
  reactor.action('game').tick()
})
gameTimer.start(LOOP_TIME)

// setup keybinds
window.addEventListener('keydown', e => {
  console.log('keydown', e.keyCode)
  switch (e.keyCode) {
    case UP_ARROW:
      reactor.action('game').rotateClockwise()
      break
    case DOWN_ARROW:
      reactor.action('game').tick()
      gameTimer.reset()
      break
    case RIGHT_ARROW:
      reactor.action('game').moveRight()
      break
    case LEFT_ARROW:
      reactor.action('game').moveLeft()
      break
    case SPACE_KEY:
      reactor.action('game').softDrop()
      gameTimer.reset()
      break
    case ESCAPE_KEY:
      if (gameTimer.isRunning) {
        gameTimer.stop()
      } else {
        gameTimer.start()
      }
      break
  }
})
