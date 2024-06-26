import{ useEffect, useState } from "react";
import { Todocard, Priority } from "./TodoCard";

import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  done: boolean;
}

export const TodosList = () => {
  const [error, setError] = useState<string | null>(null);

  const [fetchedTodos, setFetchedTodos] = useState<Todo[]>([]); // Declare state variable for fetched todos

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("security-token");

        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await axios.get(
          "https://to-do-app-two-iota.vercel.app/todoapi/v1/todos/allTodos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update state with fetched todos
        setFetchedTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching the todos", error);
        setError("Error fetching the todos");
      }
    };
    fetchTodos();
  }, [fetchedTodos]);

  const handleTodoStatusChange = (id : number,newStatus : boolean) => {
    setFetchedTodos((prevTodos) => 
      prevTodos.map((todo) => todo.id === id ? {...todo,done:newStatus} : todo)
    )
  }

  return (
    <div className="flex flex-col items-center w-full mb-4">
      <div>
        {error && <h1 className="text-red-500">{error}</h1>}
      </div>
      {fetchedTodos.filter(todo => !todo.done).map((todo) => (
        <Todocard
          key={todo.id}
          todoTitle={todo.title}
          description={todo.description}
          dueDate={new Date(todo.dueDate)}
          priority={todo.priority}
          done={todo.done}
          id={todo.id}        
          onTodoStatusChange={handleTodoStatusChange}
        />
      ))}
      {fetchedTodos.filter(todo => todo.done).map((todo) => (
        <Todocard
          key={todo.id}
          todoTitle={todo.title}
          description={todo.description}
          dueDate={new Date(todo.dueDate)}
          priority={todo.priority}
          done={todo.done}
          id={todo.id}        
          onTodoStatusChange={handleTodoStatusChange}
        />
      ))}
      <div>
        
      </div>
    </div>
  );
};
