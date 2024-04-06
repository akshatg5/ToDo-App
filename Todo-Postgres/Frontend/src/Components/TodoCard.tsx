import React from "react";

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

interface TodoCardProps {
  id : number;
  todoTitle: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  done: boolean;
  onEditTodo: (id: number) => void;
}
export const Todocard: React.FC<TodoCardProps> = ({
  id,
  todoTitle,
  description,
  dueDate,
  priority,
  done,
  onEditTodo,
}) => {



  return (
    <div className={`${done ? 'bg-green-500' : 'bg-red-500'}  my-2 w-1/2 justify-center shadow-md rounded-lg overflow-hidden flex items-center p-4 border-2 border-black`}>
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
          <button
            className="focus:outline-none p-2 rounded-full hover:bg-gray-200"
            onClick={() => onEditTodo(id) }
          >
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
          <div className="flex space-x-2">
            <button
              className={`focus:outline-none p-2 rounded-full hover:bg-gray-200 ${
                done ? "bg-green-200" : ""
              }`}
              onClick={() => {
                /* Empty function */
              }}
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
        </div>
      </div>
    </div>
  );
};
