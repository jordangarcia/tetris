/**
 * Wrapper around set timeout that can be reset or deferred
 * to postpone the function without repassing
 */
class Timeout {
  constructor(interval) {
    this.id
    this.interval
    this.fn
    this.isRunning = false
  }

  queue(fn, interval) {
    if (this.id) {
      // only allow one queued timeout at once
      this.cancel()
    }
    this.fn = fn
    this.interval = interval
    this.id = window.setTimeout(fn, interval)

    this.isRunning = true
  }

  cancel() {
    window.clearTimeout(this.id)
    this.id = null
    this.fn = null
    this.interval = null
    this.isRunning = false
  }

  /**
   * Resets the timeoue duration, but keeps the same interval / function
   */
  reset() {
    this.queue(this.fn, this.interval)
  }
}

module.exports = new Timeout()
