// Todos.jsx
import React from "react";
import "./Todos.css";

export function Todos({ todos }) {
  if (!Array.isArray(todos)) {
    return <div>
    <h1>
    No todos available
    </h1>
    </div>;
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
      {todos.map((todo) => {
        return (
          <div className="todos" key={todo._id}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button onClick={() => handleCompleteTodo(todo)}>
              {todo.done ? "Completed!!" : "Complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
