import React, { useState } from "react";
import "../styles/searchDropdown.css";
import "../App.css";

const SearchBar = ({
  onSearch,
  filteredTodos,
  handleAddTodo,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(query);
  };

  return (
    <>
      <div className="search">
        <input
          className="search-box"
          type="text"
          placeholder="Search for todos"
          value={query}
          onChange={handleSearch}
        />
      </div>
      {query && filteredTodos.length > 0 && (
        <div className="dropdown">
          <ul>
            {filteredTodos.map((todo) => (
                <li key={todo.id} onClick={()=>handleAddTodo(todo)}>
                  {todo.title}
                </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchBar;
