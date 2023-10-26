import React, { useState, useEffect } from 'react';

function EditTodo({ todo, onSave }) {
  const [editedTodo, setEditedTodo] = useState(todo);

  useEffect(() => {
    setEditedTodo(todo);
  }, [todo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedTodo);
  };

  return (
    <div>
      <h3>Edit Todo</h3>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedTodo.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button onClick={handleSave}>Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
