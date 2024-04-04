import React from "react";

interface InputBoxProps {
  placeholder: string;
  icon : JSX.Element,
  value : string,
  onChange : (event : React.ChangeEvent<HTMLInputElement>) => void,
  name : string
}

export const InputBox: React.FC<InputBoxProps> = ({ placeholder,icon,value,onChange,name}) => {
  return (
    <div className="flex align-middle items-center">
      <div className="mx-2">
        {icon}
      </div>
      <input
        className="rounded-xl px-6 py-2 mt-2 mb-2 bg-slate-800 text-white"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      ></input>
    </div>
  );
};
