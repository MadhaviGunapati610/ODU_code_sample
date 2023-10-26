import React, { useState } from 'react';

function SearchBar({ onSearch, filteredTodos }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery)
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for todos"
        value={query}
        onChange={handleSearch}
      />

      {filteredTodos.length > 0 && (
        <div className="dropdown">
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
