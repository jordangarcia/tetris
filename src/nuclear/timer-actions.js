var Const = require('./constants')

exports.start = function(reactor, interval) {
  if (interval) {
    exports.setInterval(reactor, interval)
  }

  var id = window.setTimeout(() => {
    reactor.cycle({
      type: Const.TIMER_TICK,
      payload: {}
    })
    exports.start(reactor)
  }, reactor.get('timer.interval'))

  reactor.cycle({
    type: Const.TIMER_SET_TIMEOUT_ID,
    payload: {
      id: id
    }
  })
}

exports.reset = function(reactor) {
  var id = reactor.get('timer.timeoutId')
  if (id) {
    window.clearTimeout(id)
  }
  exports.start(reactor)
}

exports.setInterval = function(reactor, interval) {
  reactor.cycle({
    type: Const.TIMER_SET_INTERVAL,
    payload: {
      interval: interval
    }
  })
}
