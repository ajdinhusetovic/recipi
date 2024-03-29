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
    <div className="flex flex-col">
      <label className="text-violet-50 xl:text-dark-text font-medium p-1">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        className="text-dark-text xl:w-full p-2 text-xl rounded focus:outline-none border"
      />
    </div>
  );
};

export default InputComponent;
