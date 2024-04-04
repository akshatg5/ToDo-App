export const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center align-middle">
        <div className="p-5 m-5 flex justify-center align-middle">
          <h1 className="text-white">
            <b>TodoApp</b>
          </h1>
        </div>
        <div className="flex flex-col m-2">
          <button className="p-5 m-5 bg-black text-white border border-white">
            Sign In
          </button>
          <button className="p-5 m-5 bg-black text-white border border-white">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};
