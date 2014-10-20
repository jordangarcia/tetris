var React = require('react')
var reactor = require('./nuclear/reactor')
var Main = require('./ui/components/main')

reactor.initialize()

window.addEventListener('keydown', e => {
  var UP_ARROW = 38
  var LEFT_ARROW = 37
  var DOWN_ARROW = 40
  var RIGHT_ARROW = 39
  var ESCAPE_KEY = 27
  var SPACE_KEY = 32

  switch (e.keyCode) {
    case UP_ARROW:
      reactor.action('keybinds').up()
      break
    case DOWN_ARROW:
      reactor.action('keybinds').down()
      break
    case RIGHT_ARROW:
      reactor.action('keybinds').right()
      break
    case LEFT_ARROW:
      reactor.action('keybinds').left()
      break
    case SPACE_KEY:
      reactor.action('keybinds').space()
      break
    case ESCAPE_KEY:
      reactor.action('keybinds').escape()
      break
  }
})

// render UI
React.renderComponent(Main(), document.getElementById('main'))

reactor.action('game').start()
