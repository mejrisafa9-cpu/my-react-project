import React, { useState, useEffect } from 'react';

function Item({ story }) {
  return (
    <li>
      <span>
        <a href={story.url} target="_blank" rel="noreferrer">
          {story.title}
        </a>
      </span>{' '}
      <span>{story.author}</span>{' '}
      <span>{story.num_comments}</span>{' '}
      <span>{story.points}</span>
    </li>
  );
}

function List({ stories }) {
  console.log('List render');

  return (
    <ul>
      {stories.map((story) => (
        <Item key={story.objectID} story={story} />
      ))}
    </ul>
  );
}

function Search({ searchTerm, onSearch }) {
  console.log('Search render');

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
}

function App() {
  console.log('App render');

  const stories = [
    {
      title: 'React',
      url: 'https://react.dev',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'JavaScript',
      url: 'https://javascript.info',
      author: 'Ilya Kantor',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
    {
      title: 'Node.js',
      url: 'https://nodejs.org',
      author: 'OpenJS Foundation',
      num_comments: 1,
      points: 3,
      objectID: 2,
    },
  ];

  // initialize state from localStorage (fallback = empty string)
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || ''
  );

  // update state when typing
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // save to localStorage whenever searchTerm changes
  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  // filter stories
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />

      <List stories={searchedStories} />
    </div>
  );
}

/*
Controlled Component:
- Input value is controlled by React state.
- value comes from state.
- onChange updates state.

Side Effect:
- Work outside rendering.
- Examples: localStorage, API calls, timers.

Why use useEffect?
- Runs side effects after render.
- Keeps rendering pure.
- Runs when dependencies change.
*/

export default App;