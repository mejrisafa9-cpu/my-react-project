import React, { useState, useEffect } from 'react';

function Item({ story, onRemoveItem }) {
  return (
    <li>
      <span>
        <a href={story.url} target="_blank" rel="noreferrer">
          {story.title}
        </a>
      </span>{' '}
      <span>{story.author}</span>{' '}
      <span>{story.num_comments}</span>{' '}
      <span>{story.points}</span>{' '}
      <span>
        <button type="button" onClick={() => onRemoveItem(story)}>
          Delete
        </button>
      </span>
    </li>
  );
}

function List({ stories, onRemoveItem }) {
  console.log('List render');

  return (
    <ul>
      {stories.map((story) => (
        <Item
          key={story.objectID}
          story={story}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  );
}

function InputWithLabel({
  id,
  value,
  type = 'text',
  onInputChange,
  children,
}) {
  console.log('InputWithLabel render');

  return (
    <>
      <label htmlFor={id}>{children}</label>&nbsp;
      <input
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
}

function App() {
  console.log('App render');

  // initial data
  const initialStories = [
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

  // stories state
  const [stories, setStories] = useState(initialStories);

  // search state from localStorage
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || ''
  );

  // input handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // persist searchTerm
  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  // remove item handler
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => story.objectID !== item.objectID
    );
    setStories(newStories);
  };

  // filter stories
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      <List
        stories={searchedStories}
        onRemoveItem={handleRemoveStory}
      />
    </div>
  );
}

/*
Reusable Component:
- Generic props
- Not tied to one feature
- Can be reused in different places
- Example: InputWithLabel instead of Search

Component Composition:
- Passing JSX/content inside component tags
- Accessed using {children}
- Makes components flexible

Why pass handlers down?
- State lives in parent (App)
- Child triggers action (button click)
- Parent updates state
- This keeps data flow one-way in React
*/

export default App;