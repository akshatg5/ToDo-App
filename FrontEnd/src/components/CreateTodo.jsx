import React, { useState, useEffect } from "react";
import "./CreateTodo.css";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  // useEffect to fetch todos from the backend when the component mounts or when todos change
  useEffect(() => {
    // Fetch todos from the backend
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [todos]); // Will re-run the effect whenever todos change

  const handleAddTodo = () => {
    // Add a new todo to the backend
    fetch("http://localhost:3000/done", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        completed: false, // Assuming todos start as incomplete
      }),
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
  };

  const handleCompleteTodo = (todoId) => {
    // Mark a todo as complete
    fetch(`http://localhost:3000/done/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({
        completed: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const json = await res.json();
        alert("Todo Marked as Complete");
      })
      .catch((error) => {
        console.error("Error completing todo:", error);
      });
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
