import React, { useState, useEffect } from "react";
import "./CreateTodo.css";


//there is a bug in this function, there is a potential for an infinite loop in using the useEffect hook, the bug will be
// solved very soon. 

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");  

  const handleAddTodo = () => {
    fetch("http://localhost:3000/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const json = await res.json();
        alert("Todo Added");
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
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
