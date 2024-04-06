import React, { useEffect, useState } from "react";
import { Todocard, Priority } from "./TodoCard";

import axios from "axios";

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  done: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onEditTodo: (id: number) => void;
}

export const TodosList: React.FC<TodoListProps> = ({ todos, onEditTodo }) => {
  const [error, setError] = useState<string | null>(null);
  const [editingTodo,setEditingTodo] = useState<Todo | null>(null);
  const [isEditing,setIsEditing] = useState(false);
  const [fetchedTodos, setFetchedTodos] = useState<Todo[]>([]); // Declare state variable for fetched todos

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("security-token");

        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await axios.get(
          "http://localhost:3000/todoapi/v1/todos/allTodos",
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
  }, []);

  const handleEditClick = (todo : Todo) => {
    setEditingTodo(null);
    setIsEditing(true);
  }

  const handleCloseEdit = () => {
    setEditingTodo(null);
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col items-center w-full mb-4">
      <div>
        {error && <h1 className="text-red-500">{error}</h1>}
      </div>
      {fetchedTodos.map((todo) => (
        <Todocard
          key={todo.id}
          todoTitle={todo.title}
          description={todo.description}
          dueDate={new Date(todo.dueDate)}
          priority={todo.priority}
          done={todo.done}
          onEditTodo={() => onEditTodo(todo.id)} 
          id={todo.id}        
        />
      ))}
      <div>
        
      </div>
    </div>
  );
};
