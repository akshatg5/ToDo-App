import { Heading } from "../Components/Heading";
import { Todocard } from "../Components/TodoCard";
import { Priority } from "../Components/TodoCard";

export const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center align-middle">
        <Heading headingText="Dashboard" />
      <div>
        <button className="bg-slate-400 px-2 py-4 mx-2 my-2 rounded-xl">Add Todo</button>
      </div>
      </div>
      <div className="grid grid-cols-5">
        <Todocard todoTitle="Gym" description="Go to the gym" dueDate={new Date()} priority={Priority.Low} done={false}  />
      </div>
    </>
  );
};
