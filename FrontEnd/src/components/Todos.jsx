// Todos.jsx
import React from "react";
import "./Todos.css";

export function Todos({ todos }) {
  if (!Array.isArray(todos)) {
    return (
      <div>
        <h1>No todos available</h1>
      </div>
    );
  }

  const handleCompleteTodo = (todo) => {
    fetch(`http://localhost:3000/done`, {
      method: "PUT",
      body: JSON.stringify({
        id: todo._id,
        completed: todo.done,
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
    <div>
      <div className="todos" >
        {todos.map((todo) => {
          return (
            <div className="card-wrapper" key={todo._id}>
              <h1 className="todo-title">{todo.title}</h1>
              <h2 className="todo-description">{todo.description}</h2>
              <button
                className="todo-btn"
                onClick={() => handleCompleteTodo(todo)}>
                {todo.done ? "Completed!!" : "Complete"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
