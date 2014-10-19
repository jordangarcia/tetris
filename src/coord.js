/**
 * Convenience function to create Coord records
 */
var Record = require('immutable').Record
var isArray = require('lodash').isArray

var Coord = Record({ x: 0, y: 0})

module.exports = function(x, y) {
  if (isArray(x)) {
    y = x[1]
    x = x[0]
  }
  return new Coord({
    x: x,
    y: y,
  })
}
