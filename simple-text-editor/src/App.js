import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText, { getSynonyms } from './text.service';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { selected: -1, words: [] };

        this.handleChangeFormat = this.handleChangeFormat.bind(this);
        this.handleChangeWord = this.handleChangeWord.bind(this);
        this.handleSelectWord = this.handleSelectWord.bind(this);

        getMockText().then((text) => {
            const words = text.split(' ').map(w => ({
                bold: false,
                color: 'black',
                italic: false,
                underline: false,
                text: w,
                synonyms: undefined,
            }));
            this.setState({ words })
        });
    }

    render() {
        const { selected, words } = this.state;
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel 
                        onChangeFormat={this.handleChangeFormat}
                        onChangeWord={this.handleChangeWord}
                        synonyms={selected < 0 ? [] : words[selected].synonyms}
                    />
                    <FileZone 
                        words={words} 
                        onSelectWord={this.handleSelectWord} 
                    />
                </main>
            </div>
        );
    }

    handleChangeFormat(format, color) {
        const { selected, words } = this.state; 
        if (selected < 0) return;
        const word = words[selected];
        if (format === 'bold') word.bold = !word.bold;
        if (format === 'color') word.color = color;
        if (format === 'italic') word.italic = !word.italic;
        if (format === 'underline') word.underline = !word.underline;
        this.setState({ words });
    }

    handleChangeWord(text) {
        const { selected, words } = this.state; 
        words[selected].synonyms[words[selected].synonyms.indexOf(text)] = words[selected].text;
        words[selected].text = text;
        this.setState({ words });
    }

    handleSelectWord(selected) {
        const { words } = this.state;
        if (selected !== -1 && !words[selected].synonyms) {
            getSynonyms(words[selected].text)
                .then((res) => {
                    words[selected].synonyms = res;
                    this.setState({ selected, words });
                });
        } else {
            this.setState({ selected });
        }
    }
}

export default App;
