// App.jsx
import React, { useEffect, useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("http://localhost:3000/todos")
        .then((res) => res.json())
        .then((data) => setTodos(data.todos));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <CreateTodo updateTodos={setTodos} />
      {/* Pass the todos array as a prop to the Todos component */}
      <h1> This is where todos should be placed :</h1>
      <Todos todos={todos} />
      <h2>Todos End</h2>
    </div>
  );
}

export default App;
