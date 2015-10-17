/**
 * @jsx React.DOM
 */
var React = require('react')
var ReactDOM = require('react-dom')

var CreateBlankBoard = require('./create-blank-board');
var AddPieceToBoard = require('./add-piece-to-board');
var MoveDown = require('./move-down');
var RotatePiece = require('./rotate-piece');
var GetLines = require('./get-lines');
var RemoveLines = require('./remove-lines');

var HelperExamples = (props) => {
  return <div>
    <CreateBlankBoard />
    <AddPieceToBoard />
    <MoveDown />
    <RotatePiece />
    <GetLines />
    <RemoveLines />
  </div>
}

// render UI
ReactDOM.render(<HelperExamples />, document.getElementById('main'))
