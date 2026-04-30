import React, { useState, useEffect } from 'react';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

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
  const [stories, setStories] = useState([]);

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || 'React'
  );

  const [url, setUrl] = useState(
    `${API_ENDPOINT}${localStorage.getItem('search') || 'React'}`
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (!searchTerm) return;
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!url) return;

    setIsLoading(true);
    setIsError(false);

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setStories(result.hits);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [url]);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => story.objectID !== item.objectID
    );
    setStories(newStories);
  };

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

      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>

      <hr />

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          stories={stories}
          onRemoveItem={handleRemoveStory}
        />
      )}
    </div>
  );
}

/*
Why use useEffect for fetching?
- Fetching data is a side effect
- useEffect runs side effects after render
- Lets React control when fetch happens

Loading state:
- Request is in progress

Error state:
- Request failed

Difference:
- Loading = waiting
- Error = failed

Why control when fetching happens?
- Prevent fetching on every keystroke
- Better performance
- User decides when to search

Why separate searchTerm and url?
- searchTerm = what user types
- url = what triggers fetching
- Fetch only happens when Submit is clicked
*/

export default App;