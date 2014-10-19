var React = require('react')
var reactor = require('./nuclear/reactor')
var Main = require('./ui/components/main')
var keybindings = require('./ui/keybindings')

// render UI
React.renderComponent(Main(), document.getElementById('main'))

reactor
  .createChangeObserver()
  .onChange('keybind', type => {
    window.removeEventListener('keydown')
    window.addEventListener('keydown', keybindings[type])
  })

window.addEventListener('keydown', keybindings[reactor.get('keybind')])

reactor.action('game').start()
