import { InputBox } from "./InputBox";

interface AddTodoFormProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    todoFormData: {
      title: string;
      description: string;
      dueDate: string;
      priority: string;
    };
    error: string | null;
  }
  
 export const AddTodoForm: React.FC<AddTodoFormProps> = ({
    handleChange,
    handleSubmit,
    todoFormData,
    error,
  }) => {
  
  
    return (
      <div>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-4">
            <InputBox
              placeholder="Todo title"
              type="text"
              name="title"
              value={todoFormData.title}
              onChange={handleChange}
              icon={
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
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              }
            />
          </div>
          <div className="mb-4">
            <InputBox
              placeholder="Description"
              type="text"
              value={todoFormData.description}
              name="description"
              onChange={handleChange}
              icon={
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
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Due Date:</label>
            <InputBox
              placeholder="Enter the Due Date"
              type="date"
              name="dueDate"
              value={todoFormData.dueDate}
              onChange={handleChange}
              icon={
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Priority:</label>
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="low"
                name="priority"
                value="low"
                checked={todoFormData.priority === "low"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="low" className="mr-4">
                Low
              </label>
              <input
                type="radio"
                id="medium"
                name="priority"
                value="medium"
                checked={todoFormData.priority === "medium"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="medium" className="mr-4">
                Medium
              </label>
              <input
                type="radio"
                id="high"
                name="priority"
                value="high"
                checked={todoFormData.priority === "high"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="high">High</label>
            </div>
          </div>
          <button
            className="bg-slate-400 px-4 py-2 rounded-xl text-white"
            type="submit"
          >
            Add
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    );
  };
  