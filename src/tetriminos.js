/**
 * Definitions for each tetrimino
 */
module.exports = {
  // enumeration of all pieces
  pieces: ['I', 'O', 'T', 'S', 'Z', 'J', 'L'],

  I: {
    color: 'cyan',
    spawnPosition: [3, 20],
    structure: [
      [0,0],
      [1,0],
      [2,0],
      [3,0],
    ]
  },

  O: {
    color: 'yellow',
    spawnPosition: [4, 20],
    structure: [
      [0,0],
      [1,0],
      [0,1],
      [1,1],
    ]
  },

  T: {
    color: 'purple',
    spawnPosition: [3, 20],
    structure: [
      [0,0],
      [1,0],
      [2,0],
      [1,1],
    ]
  },

  S: {
    color: 'green',
    spawnPosition: [3, 20],
    structure: [
      [0,0],
      [1,0],
      [1,1],
      [2,1],
    ]
  },

  Z: {
    color: 'red',
    spawnPosition: [3, 20],
    structure: [
      [1,0],
      [2,0],
      [1,1],
      [0,1],
    ]
  },

  J: {
    color: 'blue',
    spawnPosition: [3, 20],
    structure: [
      [0,0],
      [1,0],
      [1,1],
      [1,2],
    ]
  },

  L: {
    color: 'orange',
    spawnPosition: [3, 20],
    structure: [
      [0,0],
      [1,0],
      [0,1],
      [0,2],
    ]
  },
}
