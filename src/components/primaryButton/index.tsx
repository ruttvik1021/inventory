import React, { MouseEvent } from "react";

interface IButton {
  text: string;
  onClick: () => void;
}

const PrimaryButton = ({ text, onClick }: IButton) => {
  return (
    <button
      type="button"
      className=" bg-blue-50 hover:bg-gradient-to-r from-blue-200 rounded-lg p-1 text-sm text-blue-600  hover:outline hover:outline-offset-0"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
