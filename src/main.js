/**
 * @jsx React.DOM
 */
var React = require('react')
var reactor = require('./nuclear/reactor')
var Main = require('./ui/components/main')
var keyHandler = require('./ui/key-handler')

var LOOP_TIME = 1000

function start() {
  reactor.createChangeObserver()
    .onChange(['timer.count'], count => {
      window.setTimeout(() => {
        reactor.action('game').tick()
      },0)
    })
  reactor.action('timer').start(LOOP_TIME)
}

window.addEventListener('keydown', keyHandler)
React.renderComponent(<Main />, document.getElementById('main'))
start()
