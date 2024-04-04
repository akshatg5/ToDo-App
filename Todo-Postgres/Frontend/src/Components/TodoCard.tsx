import React from "react";

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

interface TodoCardProps {
  todoTitle: string;
  description ?: string;
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
    <div className="bg-slate-200">
      <div>
        <h2>{todoTitle}</h2>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div>
        <p>{formattedDueDate}</p>
      </div>
      <div>
        <p>{priority}</p>
      </div>
      <div>
        <p>{done ? "true" : "false"}</p>
      </div>
    </div>
  );
};
