import React from "react";
import { Link } from "react-router-dom";

interface MainButtonProps {
  btnText: string;
  btnLink : string
}

export const MainButton: React.FC<MainButtonProps> = ({ btnText,btnLink}) => {
  return (
    <div className="flex justify-center">
        <Link to={btnLink} >
      <button className="px-8 py-4 m-2 bg-black text-white border border-white rounded-3xl">
        <h1 className="font-bold">{btnText}</h1>
      </button>
        </Link>
    </div>
  );
};
