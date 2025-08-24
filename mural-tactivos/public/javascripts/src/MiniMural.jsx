var React = require('react');
var ReactDOM = require('react-dom');
var Clipboard = require('./clipboard-custom.jsx');

var StickyNote = React.createClass({
    propTypes: {
        my_id: React.PropTypes.number, //avoiding key confusion
        is_selected: React.PropTypes.bool,
        text: React.PropTypes.string,
        pos : React.PropTypes.object,
        onSelect: React.PropTypes.func,
        onChange: React.PropTypes.func
    },
    handleMouseOver: function(e){
      e.preventDefault();
      if(this.state.name != 'selected'){
        this.setState({name: 'over'});
      }
    },
    handleMouseOut: function(e){
      e.preventDefault();
      if(this.state.name != 'selected'){
        this.setState({name: 'idle'});
      }
    },
    handleClick: function (e){
      e.stopPropagation(); //Evita que se dispare el handleClick del padre
      if(this.state.name != 'selected'){
        this.props.onSelect(this.props.my_id, e); //polémica this.key -> no recomendado
      }
    },
    handleDoubleClick: function(e) {
      e.stopPropagation(); //Evita que se dispare el handleClick del padre
    },
    handleChangeChild: function(e){
      //Envío al padre la actualización del texto
      this.state.scrollHeight = e.target.scrollHeight;
      this.props.onChange(this.props.my_id, e.target.value);
      this.setState({
        value: e.target.value
      });
    },
    getInitialState: function() {
      return { name: 'idle', value: this.props.text, last_state: '', scrollHeight: 0 };
    },
    render: function() {
        var size = 200;
        var divStyle = {
          background: 'yellow',
          width: size+'px',
          height: size+'px',
          position: 'absolute',
          left: this.props.pos.x + 'px',
          top: this.props.pos.y + 'px',
          marginLeft: '-'+(size*.5)+'px',
          marginTop: '-'+(size*.5)+'px',
        };

        if(this.props.is_selected){
          this.state.last_state = "idle"; //es imposible que esté en el over y deseleccionado
          this.state.name = "selected";
        } else {
          if(this.state.last_state != ''){
            this.state.name = this.state.last_state;
            this.state.last_state = '';
          }
        }

        var lines = this.state.value.split('*').length;
        var textStyle = {
          position: 'relative',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          resize: 'none',
          overflow: 'hidden',
          outline: 'none',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          paddingTop: ((size*.5)-(20*lines))+'px'
        };

        switch(this.state.name) {
            case "selected":
                divStyle.border = 'solid 2px red';
                break;
            case "over":
                divStyle.border = 'solid 2px green';
                break;
            case "idle":
                divStyle.border = 'solid 2px transparent';
                break;
        }
        return (
          <div className="stickyNote" style={divStyle} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} >
            <textarea defaultValue={this.props.text} onChange={this.handleChangeChild} onFocus={this.handleFocus} style={textStyle} />
          </div>
        );
    }
});

module.exports = React.createClass({
    handleCopy : function(e) {
      this.state.copyType = 'normal';
    },
    handleAltCopy: function(e){
      if(this.state.selection.length == 1){
        this.state.copyType = 'normal';
      } else {
        var target = '';
        for (i = 0; i < this.state.selection.length; i++) {
            if(i>0) target += '\n';
            var t = this.state.data[this.state.selection[i]].text;
            if(t.indexOf('*') == -1) t = '* '+t;
            target += t;
        }
        this.state.copied = target;
        this.state.copyType = 'alt';
      }
    },
    handlePaste : function(e) {
      switch(this.state.copyType){
        case 'normal':
          var offset = this.state.data[this.state.selection[0]].pos;
          var newStickys = [];
          for (i = 0; i < this.state.selection.length; i++) {
              var sel = this.state.data[this.state.selection[i]];
              var targetPos = this.state.currentPos;
              targetPos.x += (sel.pos.x - offset.x);
              targetPos.y += (sel.pos.y - offset.y);
              newStickys.push({text: sel.text, pos: {x: targetPos.x, y: targetPos.y}});
          }
          this.addSticky(newStickys);
        break;
        case 'alt':
          this.addSticky({text: this.state.copied, pos: this.state.currentPos });
        break;
        default:
          this.addSticky({text: this.state.copied, pos: this.state.currentPos });
        break;
      }
    },
    handleMouseMove: function(e){
      this.state.currentPos = {x: e.pageX, y: e.pageY};
    },
    handleStickySelect: function(id, e){
      if(e.shiftKey){
        var a = this.state.selection;
        a.push(id);
        this.setState({selection: a});
      } else {
        this.setState({selection: [id]});
      }
    },
    handleStickyChange: function(id, newText){
      this.state.data[id].text = newText;
    },
    handleClick: function(e) {
      if(this.state.selection.length > 0 && !e.shiftKey){
        this.setState({selection: []});
      }
    },
    handleDoubleClick: function(e) {
      this.addSticky({text: 'Click', pos: {x: e.pageX, y: e.pageY} });
    },
    getInitialState: function() {
      return {data: [], selection: [], copied: '', copyType: '', currentPos: {} };
    },
    addSticky: function(o){
      var stickys = this.state.data;
      var newStickys;
      //Chequeo si es un objeto o un array de objetos
      if(o.length == undefined){
        newStickys = stickys.concat([o]);
      } else newStickys = stickys.concat(o);
      this.setState({data: newStickys});
    },
    componentDidMount: function() {
      this.setState({data: this.props.data});
    },
    render: function() {

        var divStyle = {
          background: 'lightblue',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: '0',
          top: '0'
        };

        //Instancio al padre
        var self = this;
        var stickys = this.state.data.map(function (note, i) {
          var st = self.state.selection.indexOf(i) != -1;
          return (
            <StickyNote my_id={i} is_selected={st} text={note.text} pos={note.pos} onChange={self.handleStickyChange} onSelect={self.handleStickySelect} key={i} />
          );
        });
        return (
          <div className="miniMural" onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
            <Clipboard value={this.state.copied} onCopy={this.handleCopy} onPaste={this.handlePaste} onMouseMove={this.handleMouseMove} onAltCopy={this.handleAltCopy} />
            {stickys}
          </div>
        );
    }
});
