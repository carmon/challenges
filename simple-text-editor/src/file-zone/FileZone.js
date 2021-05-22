import React, { Component } from 'react';
import './FileZone.css';

const Word = ({ bold, color, italic, underline, text, onSelect }) => 
{
    let classes = bold ? 'bold ' : '';
    if (italic) classes += 'italic ';
    if (underline) classes += 'underline';
    return (
        <span 
            id="word" 
            className={classes} 
            onDoubleClick={onSelect} 
            style={{ color }}
        >
            {text}
        </span>
    );
}

const Space = () => 
    <span style={{ display: 'inline-block' }}>&nbsp;</span>;

class FileZone extends Component {
    render() {
        const { onSelectWord, words } = this.props;
        return (
            <div id="file-zone" onClick={() => onSelectWord(-1)}>
                <div id="file">
                    <div id="text">
                        {words.map((w, it) => 
                            <div id="word-container" key={it}>
                                <Word {...w} onSelect={() => onSelectWord(it)} /> 
                                <Space />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default FileZone;
