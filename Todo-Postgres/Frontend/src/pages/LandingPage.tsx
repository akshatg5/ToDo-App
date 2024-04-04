import { Heading } from "../Components/Heading";
import { MainButton } from "../Components/MainButtons";

export const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center align-middle">
        <div className="p-5 al flex justify-center align-middle">
          <Heading headingText="TodoApp" />
        </div>
        <div className="flex flex-col m-2">
          <MainButton btnText="Sign In" btnLink="/signin" />
          <MainButton btnText="Sign Up" btnLink="signup" />
        </div>
      </div>
    </>
  );
};
