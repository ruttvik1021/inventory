interface IButton {
  text: string;
  onClick: any;
  className?: string;
  type?: "button" | "submit";
}

const PrimaryButton = ({ text, onClick, className, type }: IButton) => {
  return (
    <button
      type={type ? type : "button"}
      className={`${className} flex min-w-[100px] w-28 justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
