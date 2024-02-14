import React from "react";

interface InputComponentProps {
  label: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type,
  onChange,
}) => {
  return (
    <div className="flex flex-col text-white">
      <label className="text-neutral-300 p-1">{label}</label>
      <input
        type={type}
        onChange={onChange}
        className="text-black w-96 p-2 text-xl rounded focus:outline-none"
      />
    </div>
  );
};

export default InputComponent;
