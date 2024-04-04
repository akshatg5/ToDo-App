import React from "react";
import { MainButton } from "./MainButtons";

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

interface TodoCardProps {
  todoTitle: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  done: boolean;
}

export const Todocard: React.FC<TodoCardProps> = ({
  todoTitle,
  description,
  dueDate,
  priority,
  done,
}) => {
  const formattedDueDate = dueDate?.toLocaleDateString();

  return (
    <div className="px-2 mx-2 py-2 my-4 bg-slate-200 border-4 border-black">
      <div>
        <h2>{todoTitle}</h2>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div>
        <p>Due Date : {formattedDueDate}</p>
      </div>
      <div>
        <p>Priority : {priority}</p>
      </div>
      <div className="flex">
        <button className="bg-slate-800 p-2 rounded-xl m-2">
          <h1 className="text-white">✅ Done</h1>
        </button>
        <button className="bg-slate-800 p-2 rounded-xl m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
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
  );
};
