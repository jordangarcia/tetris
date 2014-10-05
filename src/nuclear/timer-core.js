var Nuclear = require('nuclear-js')
var Immutable = require('immutable')
var Const = require('./constants')

var DEFAULT_TICK = 1000 // default tick is 1000ms
/**
 * Core that keeps track of the games timer
 */
module.exports = Nuclear.createCore({
  initialize() {
    this.on(Const.TIMER_SET_INTERVAL, setInterval)
    this.on(Const.TIMER_SET_TIMEOUT_ID, setTimeoutId)
    this.on(Const.TIMER_TICK, tick)

    return {
      count: 0,
      interval: DEFAULT_TICK,
      timeoutId: null,
    }
  }
})

function tick(state) {
  return state.set('count', state.get('count') + 1)
}

function setInterval(state, payload) {
  return state.set('interval', payload.interval)
}

function setTimeoutId(state, payload) {
  return state.set('timeoutId', payload.id)
}
