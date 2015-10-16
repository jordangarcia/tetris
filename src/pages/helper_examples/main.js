/**
 * @jsx React.DOM
 */
var React = require('react')
var ReactDOM = require('react-dom')

var CreateBlankBoard = require('./0-create-blank-board');
var AddPieceToBoard = require('./1-add-piece-to-board');
var GetLines = require('./2-get-lines');
var RemoveLines = require('./3-remove-lines');

var HelperExamples = (props) => {
  return <div>
    <CreateBlankBoard />
    <AddPieceToBoard />
    <GetLines />
    <RemoveLines />
  </div>
}

// render UI
ReactDOM.render(<HelperExamples />, document.getElementById('main'))
