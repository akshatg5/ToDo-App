import axios from "axios";
import React, { useState } from "react";

import { Heading } from "../Components/Heading";
import { AddTodoForm } from "../Components/AddTodoForm";
import { TodosList } from "../Components/TodosList";

export const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const [todoFormData, setTodoFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  // storing the JWT token in local storage for authentication
  const [token, setToken] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const toggleAddTodoForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "dueDate" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      newValue = value;
    }
    setTodoFormData({ ...todoFormData, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("security-token");

      // Format the dueDate before sending the request
      const formattedDueDate = new Date(todoFormData.dueDate).toISOString();
      const formattedFormData = {
        ...todoFormData,
        dueDate: formattedDueDate,
      };

      const response = await axios.post(
        "http://localhost:3000/todoapi/v1/todos/todo",
        formattedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Todo created", response.data);
        toggleAddTodoForm();
        setTodoFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "",
        });
      }
    } catch (error) {
      console.error("Error creating the todo");
      setError("Error creating the todo!Try again");
    }
  };
  
  const updateToken = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Heading headingText="Dashboard" />
        <div>
          <button
            className="bg-slate-400 px-2 py-4 mx-2 my-2 rounded-xl"
            onClick={toggleAddTodoForm}
          >
            Add Todo
          </button>
        </div>
        <div>
          {showForm && (
            <AddTodoForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              todoFormData={todoFormData}
              error={error}
              updateToken={updateToken}
            />
          )}
        </div>
          <TodosList/>
      </div>
    </>
  );
};
