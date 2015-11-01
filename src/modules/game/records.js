import { Immutable } from 'nuclear-js'

exports.Piece = Immutable.Record({
  type: null,
  rotation: 0,
  pos: null,
})
