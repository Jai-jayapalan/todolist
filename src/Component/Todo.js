import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (editingId !== null) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editingId) {
          return { ...todo, text:inputValue };
        }
        return todo;
      });

      setTodos(updatedTodos);
      setInputValue("");
      setEditingId(null);
    } else {
      const newTodo = { id: Date.now(), text:inputValue };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleEditTodo = (id, text) => {
    setInputValue(text);
    setEditingId(id);
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <div className="ui action input">
        <input type="text" placeholder="Enter a value" value={inputValue}
            onChange={handleInputChange}
        />
        <button className="ui primary button" onClick={handleAddTodo}>
            {editingId !== null ? "Update" : "Add"} Todo
        </button>
      </div>
      <ul>
        {
        todos.map((todo) => (
          <li key={todo.id} style={{listStyleType:'none'}}>
            {todo.text}
            <button className="ui blue button" onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
            <button className="ui red button" onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;