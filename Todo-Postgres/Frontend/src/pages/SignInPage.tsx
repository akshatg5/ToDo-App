import { InputBox } from "../Components/InputBox";
import { Heading } from "../Components/Heading";
import { MainButton } from "../Components/MainButtons";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SignInFormData {
  username : string;
  password : string;
}

export const SignInPage = () => {

const [error,setError] = useState<string | null>(null)

const [signInFormData,setSignInFormData] = useState<SignInFormData>({
  username : "",
  password : ""
})

const navigate = useNavigate()

const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  const {name,value} = e.target;
  setSignInFormData({...signInFormData,[name] : value})
}

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:3000/todoapi/v1/user/signin",signInFormData)

    if (response.status === 200) {
      navigate("/dashboard")
    } else {
      console.error("SignIn Failed")
      setError("Sign In Failed, try Again!")
    }
  } catch (error) {
    console.error("SignIn Failed")
    setError("Sign In Failed, try Again!")
  }
}

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="">
        <Heading headingText="Sign In" />
      </div>
      <form onSubmit={handleSubmit}>

      <InputBox
        placeholder="Enter your Username here!"
        name="username"
        value={signInFormData.username}
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
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
          </svg>
        }
      />
      <InputBox
        placeholder="Enter your password here!"
        name="password"
        value={signInFormData.password}
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
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
          </svg>
        }
        />
        <button
          type="submit"
          className="bg-slate-600 text-white px-2 py-2 rounded-xl my-2"
        >Sign In</button>
        </form>
    <div>
      <p>Don't have an account? Sign Up here:</p>
      <MainButton btnLink="/signup" btnText="Sign Up" />
    </div>
    <div>
      <p className="text-red">{error}</p>
    </div>

    </div>
  );
};
