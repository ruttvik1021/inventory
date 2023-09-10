interface IButton {
  text: string;
  onClick: any;
  className?: string;
}

const DeleteButton = ({ text, onClick, className }: IButton) => {
  return (
    <button
      type="button"
      className={`flex min-w-[100px] w-28 justify-center rounded-md bg-red-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DeleteButton;
