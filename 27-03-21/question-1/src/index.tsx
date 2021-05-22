import * as React from 'react';
import { Fragment, useState } from 'react';

import * as ReactDOM from 'react-dom';

interface MovieData {
  Title: string;
  Year: number;
  imdbID: string;
}

const getDataSet = async (input: string): Promise<{ data: MovieData[] }> => 
  await (await fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${input}`)).json();

const App = () => {
  const [year, setYear] = useState('');
  const [dirty, setDirty] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setYear(e.currentTarget.value)
  };

  const handleSearchClick = async () => {
    const { data } = await getDataSet(year);
    setTitles(data.map(m => m.Title));

    if (!dirty) setDirty(true);
  };

  return (
    <Fragment>
      <input 
        data-testid='app-input'
        onInput={handleInput}
        placeholder='Enter Year eg 2015' 
        type='number' 
      />
      <button data-testid='submit-button' onClick={handleSearchClick}>Search</button>
      {titles.length 
        ? <ul data-testid='movieList'>{titles.map((t, k) => <li key={k}>{t}</li>)}</ul>
        : dirty && <div data-testid='no-result'>No Results Found</div>}
    </Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
