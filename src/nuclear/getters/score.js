var Nuclear = require('nuclear-js')

module.exports = Nuclear.Getter({
  deps: ['game.clears'],
  /**
   * @param {array<number>} clears history of all line clears
   */
  compute(clears) {
    var score = {
      lines: 0,
      single: 0,
      double: 0,
      triple: 0,
      tetris: 0,
    }

    clears.forEach(num => {
      score.lines += num
      switch(num) {
        case 1:
          score.single++
          break
        case 2:
          score.double++
          break
        case 3:
          score.triple++
          break
        case 4:
          score.tetris++
          break
      }
    })

    return score
  }
})
