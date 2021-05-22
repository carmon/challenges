import React, { Component } from 'react';
import './ControlPanel.css';

const colors = [
    'red', 'blue', 'yellow', 'grey', 'green', 'black', 'orange',
    'aqua', 'beige', 'coral', 'cyan', 'gold', 'lime', 'maroon'
];

const getRandomColor = () => 
    colors[Math.floor(Math.random(colors.length) * 10)];

class ControlPanel extends Component {
    render() {
        const { onChangeFormat, onChangeWord, synonyms } = this.props;
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button 
                        className="format-action" 
                        type="button" 
                        onClick={() => onChangeFormat('bold')}
                    >
                        <b>B</b>
                    </button>
                    <button 
                        className="format-action" 
                        type="button"
                        onClick={() => onChangeFormat('italic')}
                    >
                        <i>I</i>
                    </button>
                    <button 
                        className="format-action" 
                        type="button"
                        onClick={() => onChangeFormat('underline')}
                    >
                        <u>U</u>
                    </button>
                    <button 
                        className="format-action" 
                        type="button"
                        onClick={() => onChangeFormat('color', getRandomColor())}
                    >
                        Random Color
                    </button>
                    {synonyms.map((s, it) => 
                        <button 
                            key={it}
                            className="format-action" 
                            type="button"
                            onClick={() => onChangeWord(s)}
                        >
                            {s}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default ControlPanel;
