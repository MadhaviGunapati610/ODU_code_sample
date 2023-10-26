import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTodo from "./EditTodo";
import SearchBar from "./SearcheBar";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTodo, setEditTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleEdit = (todo) => {
    setEditTodo(todo);
  };

  const handleSave = (editedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodos(updatedTodos);
    setEditTodo(null);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?query=${searchQuery}`
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [searchQuery]);
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  return (
    <div>
      <header>
        <h1>Todo List</h1>
        <SearchBar onSearch={handleSearch} filteredTodos={filteredTodos}/>
        {searchQuery !== "" && console.log(searchQuery, todos, "new todos")}
      </header>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}{" "}
              <button onClick={() => handleEdit(todo)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
      {editTodo && <EditTodo todo={editTodo} onSave={handleSave} />}
    </div>
  );
};

export default TodoList;
