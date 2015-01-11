var coord = require('./coord')

/**
 * Definitions for each tetrimino
 */
module.exports = {
  // enumeration of all pieces
  pieces: ['I', 'O', 'T', 'S', 'Z', 'J', 'L'],

  I: {
    color: 'cyan',
    spawnPosition: coord(3, 20),
    // structure defines all rotations for a piece type
    structure: [
      [coord(0,0), coord(1,0), coord(2,0), coord(3,0)],
      [coord(0,0), coord(0,1), coord(0,2), coord(0,3)],
    ]
  },

  O: {
    color: 'yellow',
    spawnPosition: coord(4,20),
    structure: [
      [coord(0,0), coord(1,0), coord(0,1), coord(1,1)],
    ]
  },

  T: {
    color: 'purple',
    spawnPosition: coord(3,20),
    structure: [
      [coord(0,0), coord(1,0), coord(2,0), coord(1,1)],
      [coord(0,0), coord(0,1), coord(1,1), coord(0,2)],
      [coord(0,1), coord(1,0), coord(1,1), coord(2,1)],
      [coord(0,1), coord(1,0), coord(1,1), coord(1,2)],
    ]
  },

  S: {
    color: 'green',
    spawnPosition: coord(3,20),
    structure: [
      [coord(0,0), coord(1,0), coord(1,1), coord(2,1)],
      [coord(1,0), coord(1,1), coord(0,1), coord(0,2)],
    ]
  },

  Z: {
    color: 'red',
    spawnPosition: coord(3,20),
    structure: [
      [coord(0,1), coord(1,1), coord(1,0), coord(2,0)],
      [coord(0,0), coord(0,1), coord(1,1), coord(1,2)],
    ]
  },

  J: {
    color: 'blue',
    spawnPosition: coord(3,20),
    structure: [
      [coord(0,0), coord(1,0), coord(2,0), coord(0,1)],
      [coord(0,0), coord(0,1), coord(0,2), coord(1,2)],
      [coord(0,1), coord(1,1), coord(2,1), coord(2,0)],
      [coord(0,0), coord(1,0), coord(1,1), coord(1,2)],
    ]
  },

  L: {
    color: 'orange',
    spawnPosition: coord(3,20),
    structure: [
      [coord(0,0), coord(1,0), coord(2,0), coord(2,1)],
      [coord(0,0), coord(1,0), coord(0,1), coord(0,2)],
      [coord(0,0), coord(0,1), coord(1,1), coord(2,1)],
      [coord(0,2), coord(1,2), coord(1,1), coord(1,0)],
    ]
  },
}
