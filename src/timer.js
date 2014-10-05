class Timer {
  constructor(interval) {
    this.count = 0
    this.interval = interval
    this.handlers = []
    this.timeoutId
    this.isRunning = false
  }

  onTick(handler) {
    this.handlers.push(handler)
  }

  start(interval) {
    if (interval) {
      this.interval = interval
    }

    this.timeoutId = window.setTimeout(() => {
      this.handlers.forEach(handler => {
        handler()
      })
      this.count++
      this.start()
    }, this.interval)

    this.isRunning = true
  }

  stop() {
    window.clearTimeout(this.timeoutId)
    this.isRunning = false
  }

  reset() {
    this.stop()
    this.start()
  }

  setInterval(interval) {
    this.interval = interval
  }
}

module.exports = Timer
