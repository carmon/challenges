import React, { Fragment, useEffect, useRef, useState } from 'react';
import './App.css';

const Option = ({
  onSelect,
  value
}: {
  onSelect: () => void;
  value: string
}) => <p className="option" onClick={onSelect}>{value}</p>

const Submitted = ({
  error,
  onErase,
  value
}: {
  error: boolean;
  onErase: () => void;
  value: string;
}) => <span className={`submitted ${error ? 'error' : ''}`}>{value}<button onClick={onErase}>{error ? '!' : 'X'}</button></span>;

const App = () => {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
     async function getList() {
        const res = await fetch('list.csv');
        const text = await res.text();
        setList(text.split('\n').map(s => s.trim()).sort());
     }
     getList();
  }, [])

  const [value, setValue] = useState('');
  const [filtered, setFiltered] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curr = e.target.value; 
    setValue(curr);
    setFiltered(list.filter(email => email.includes(curr)));
  }

  const [submitted, setSubmitted] = useState<string[]>([]);
  const submitCurrentValue = () => {
    setSubmitted([...submitted, value]);
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitCurrentValue();
      reset();
    }
    if (e.key === 'Backspace') {
      if (submitted.length > 0)
        setSubmitted(submitted.slice(0, submitted.length - 1));
    }
  }

  const handleRemoveSubmitted = (index: number) => () => {
    setSubmitted([...submitted.slice(0, index), ...submitted.slice(index + 1, submitted.length)]);
    reset();
  };

  const handleAddSubmitted = (index: number) => () => {
    setSubmitted([...submitted, filtered[index]]);
    reset();
  };

  const inputEl = useRef<HTMLInputElement>(null);
  const reset = () => {
    if (inputEl && inputEl.current)
      inputEl.current.focus();
    
    setFiltered([]);
    setValue('');
  };

  useEffect(() => {
    if (inputEl && inputEl.current)
      inputEl.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [submitted])

  return (
    <Fragment>
      <div className="prompt-container">
        {submitted.length > 0 &&
          submitted.map((email, i) => 
            <Submitted key={i} error={!list.includes(email)} value={email} onErase={handleRemoveSubmitted(i)} />)}
        {<input
          ref={inputEl}
          placeholder={submitted.length > 0 ? '' : 'Enter recipients...'}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          value={value}
        />}
      </div>
      {filtered.length > 0 &&
        <div className="list-container">
          {filtered.map((email, i) => <Option key={i} value={email} onSelect={handleAddSubmitted(i)} />)}
        </div>}
    </Fragment>
  );
}

export default App;
