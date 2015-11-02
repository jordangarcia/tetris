/**
 * Definitions for each tetrimino
 */
export default {
  // enumeration of all pieces
  pieces: ['I', 'O', 'T', 'S', 'Z', 'J', 'L'],

  I: {
    color: 'cyan',
    spawnPosition: [3, 20],
    // structure defines all rotations for a piece type
    structure: [
      [[0,0], [1,0], [2,0], [3,0]],
      [[0,0], [0,1], [0,2], [0,3]],
    ]
  },

  O: {
    color: 'yellow',
    spawnPosition: [4,20],
    structure: [
      [[0,0], [1,0], [0,1], [1,1]],
    ]
  },

  T: {
    color: 'purple',
    spawnPosition: [3,20],
    structure: [
      [[0,0], [1,0], [2,0], [1,1]],
      [[0,0], [0,1], [1,1], [0,2]],
      [[0,1], [1,0], [1,1], [2,1]],
      [[0,1], [1,0], [1,1], [1,2]],
    ]
  },

  S: {
    color: 'green',
    spawnPosition: [3,20],
    structure: [
      [[0,0], [1,0], [1,1], [2,1]],
      [[1,0], [1,1], [0,1], [0,2]],
    ]
  },

  Z: {
    color: 'red',
    spawnPosition: [3,20],
    structure: [
      [[0,1], [1,1], [1,0], [2,0]],
      [[0,0], [0,1], [1,1], [1,2]],
    ]
  },

  J: {
    color: 'blue',
    spawnPosition: [3,20],
    structure: [
      [[0,0], [1,0], [2,0], [0,1]],
      [[0,0], [0,1], [0,2], [1,2]],
      [[0,1], [1,1], [2,1], [2,0]],
      [[0,0], [1,0], [1,1], [1,2]],
    ]
  },

  L: {
    color: 'orange',
    spawnPosition: [3,20],
    structure: [
      [[0,0], [1,0], [2,0], [2,1]],
      [[0,0], [1,0], [0,1], [0,2]],
      [[0,0], [0,1], [1,1], [2,1]],
      [[0,2], [1,2], [1,1], [1,0]],
    ]
  },
}
