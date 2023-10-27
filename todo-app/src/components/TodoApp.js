import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import axios from "axios";
import SearchBar from "./SearchBar";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [addTodo, setAddTodo] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?query=${searchQuery}`,
          {
            params: {
              _limit: 10,
            },
          }
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
  const handleDeleteTodo = (todo) => {
    const updatedTodos = addTodo.filter((t) => t.id !== todo.id);
    setAddTodo(updatedTodos);
  };

  const handleAddTodo = (todo) => {
    const isAvailable =
      addTodo.length > 0 && addTodo.some((x) => x.id === todo.id);
    if (!isAvailable) {
      setAddTodo([...addTodo, todo]);
      setFilteredTodos("");
      setSearchQuery("");
    } else {
      alert("you already added!");
    }
  };

  return (
    <>
      <header className="app-title">
        <a href="#">Todo List</a>
      </header>
      <SearchBar
        onSearch={handleSearch}
        filteredTodos={filteredTodos}
        handleAddTodo={handleAddTodo}
      />
      <TodoList
        todos={addTodo}
        loading={loading}
        handleDeleteTodo={handleDeleteTodo}
      />
    </>
  );
};

export default TodoApp;
