import React from "react";

interface IButton {
  text: string;
  onClick: any;
}

const DeleteButton = ({ text, onClick }: IButton) => {
  return (
    <button
      type="button"
      className="flex w-full justify-center rounded-md bg-red-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DeleteButton;
