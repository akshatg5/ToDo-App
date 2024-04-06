import axios from "axios";
import React, { useState } from "react";

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

interface TodoCardProps {
  id: number;
  todoTitle: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  done: boolean;
  onTodoStatusChange: (id: number, newStatus: boolean) => void;
}
export const Todocard: React.FC<TodoCardProps> = ({
  id,
  todoTitle,
  description,
  dueDate,
  priority,
  done,
  onTodoStatusChange,
}) => {
  const [todoStatus, setTodoStatus] = useState(done);

  const handleTodoStatus = async () => {
    try {
      const token = localStorage.getItem("security-token");
      if (!token) {
        throw new Error("Token not found in local stoage");
      }

      const response = await axios.post(
        `http://localhost:3000/todoapi/v1/todos/todoStatus/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTodoStatus(!todoStatus);
        onTodoStatusChange(id, !todoStatus);
        console.log("Todo status is updated.");
        // alert(`Todo status has been updated to ${!todoStatus}`);
      }
    } catch (error) {
      console.error("Error in updating todo status");
    }
  };

  const handleTodoDelete = async () => {
    try {
      const token = localStorage.getItem("security-token");
      if (!token) {
        console.log("Security token not found!");
      }

      const response = await axios.delete(
        `http://localhost:3000/todoapi/v1/todos/todo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Todo Deleted!")
      }
    } catch (error) {
      console.error("Error in deleting the todo");
    }
  };

  return (
    <div
      className={`${done ? "filter blur-sm" : ""} ${
        done ? "bg-green-400" : "bg-red-500"
      } my-2 w-1/2 justify-center shadow-md rounded-lg overflow-hidden flex items-center p-4 border-2 border-black`}
    >
      <div className="w-full flex flex-col">
        <h1 className="text-xl font-bold text-gray-800">{todoTitle}</h1>
        <p className="text-white mt-2">{description}</p>
        <p className="text-white mt-2">
          Due Date: {dueDate ? dueDate.toLocaleDateString() : ""}
        </p>
      </div>

      <div className="flex flex-col ml-auto">
        <p className="text-white text-sm">Priority: {priority}</p>
        <div className="flex justify-between items-center">
          <button className="focus:outline-none p-2 rounded-full hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          {/* done button */}
          <div className="flex space-x-2">
            <button
              className={`focus:outline-none p-2 rounded-full hover:bg-gray-200 ${
                done ? "bg-green-500" : ""
              }`}
              onClick={handleTodoStatus}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              className={`focus:outline-none p-2 rounded-full hover:bg-gray-200 ${
                done ? "bg-green-500" : ""
              }`}
              onClick={handleTodoDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
