import axios from "axios";
import React, { useState, useEffect } from "react";
import { InputBox } from "../Components/InputBox";
import { Heading } from "../Components/Heading";
import { MainButton } from "../Components/MainButtons";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const SignUpPage = () => {
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // destructuring the name and value to pass it onto the event target to pass the form data
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/todoapi/v1/user/signup",
        formData
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem(
          `security-token`,
          token
        );
        navigate("/dashboard");
      } else {
        console.error("Signup Failed");
        setError("Signup Failed! Try again.");
      }
    } catch (error) {
      console.error("Error : error");
      setError("Signup Failed! Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="">
        <Heading headingText="Sign Up" />
      </div>
      <form onSubmit={handleSubmit}>
        <InputBox
          placeholder="Enter your Username here!"
          name="username"
          type="text"
          value={formData.username}
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
          placeholder="Enter your email here!"
          name="email"
          type="email"
          value={formData.email}
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
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          }
        />

        <InputBox
          placeholder="Enter your password here!"
          name="password"
          type="password"
          value={formData.password}
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
        <InputBox
          placeholder="Enter your First name here!"
          name="firstName"
          type="text"
          value={formData.firstName}
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
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
              />
            </svg>
          }
        />
        <InputBox
          placeholder="Enter your last name here!"
          name="lastName"
          type="text"
          value={formData.lastName}
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
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
              />
            </svg>
          }
        />
        <button
          type="submit"
          className="bg-slate-600 text-white px-2 py-2 rounded-xl my-2"
        >
          Sign Up
        </button>
      </form>
      <div>
        <p>Already have an account? Sign In here:</p>
        <MainButton btnLink="/signin" btnText="Sign In" />
      </div>
      <div>
        <p>{error} </p>
      </div>
    </div>
  );
};
