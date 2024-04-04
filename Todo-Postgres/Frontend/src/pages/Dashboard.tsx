import { Heading } from "../Components/Heading";
import { Todocard } from "../Components/TodoCard";
import { Priority } from "../Components/TodoCard";

export const Dashboard = () => {
  return (
    <>
      <div className="flex justify-center items-center align-middle">
        <Heading headingText="Dashboard" />
      </div>
      <div>
        <Todocard todoTitle="Gym" description="Go to the gym" dueDate={new Date()} priority={Priority.Low} done={false}  />
      </div>
    </>
  );
};
