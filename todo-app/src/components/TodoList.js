import React from "react";
import "../styles/todoList.css";

const TodoList = ({ loading, todos, handleDeleteTodo, handleCompleteTodo }) => {
const lineThrough = {
    textDecoration: "line-through",
  };
  const removeLineThrough = {
    textDecoration: "none",
  };
  return (
    <div>
      <main>
        <section>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="item-list">
              {todos.map((todo, index) => (
                <div key={index} className="item">
                  <input type="checkbox" id={`item-${index}`} />
                  <label htmlFor={`item-${index}`}>
                    <li key={todo.id} style={ todo.completed ? lineThrough : removeLineThrough}>{ todo.title}</li>
                    <button className="delete-button" onClick={() => handleDeleteTodo(todo)}>
                      Delete
                    </button>
                  </label>
                </div>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default TodoList;
