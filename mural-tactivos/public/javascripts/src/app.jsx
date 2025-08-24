var React = require('react');
var ReactDOM = require('react-dom');

var data = [
  {text: 'Click', pos: {x: 400, y: 200}}
];

var MiniMural = require('./MiniMural.jsx');

ReactDOM.render(
	<MiniMural data={data} />,
    document.getElementById('example')
);