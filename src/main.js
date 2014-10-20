var React = require('react')
var reactor = require('./nuclear/reactor')
var Main = require('./ui/components/main')

reactor.initialize()

// setup keydown handler
window.addEventListener('keydown', e => {
  reactor.action('keybinds').handleKeydown(e.keyCode);
})

// render UI
React.renderComponent(Main(), document.getElementById('main'))

reactor.action('game').start()
