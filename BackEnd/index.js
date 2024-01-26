import React, { useState, useEffect } from "react";
import "./CreateTodo.css";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  // useEffect to fetch todos from the backend only once when the component mounts
  useEffect(() => {
    // Fetch todos from the backend
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []); // Will run the effect only once when the component mounts

  const handleAddTodo = () => {
    if (title && description) {
      // Add a new todo locally without making a request to the backend
      const newTodo = {
        title: title,
        description: description,
        completed: false, // Assuming todos start as incomplete
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);

      // Add a new todo to the backend
      fetch("http://localhost:3000/create", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const json = await res.json();
          alert("Todo Added");
          setTitle(""); // Clear the input fields after adding todo
          setDescription("");
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    } else {
      alert("Please enter both title and description");
    }
  };

  return (
    <div className="Parent-div">
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add a Todo</button>
    </div>
  );
}
