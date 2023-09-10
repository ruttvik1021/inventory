import { Switch } from "@headlessui/react";

interface IProps {
  enabled: boolean;
  setEnabled: any;
  leftLabel?: string;
  rightLabel?: string;
}

const Toggle = ({ enabled, setEnabled, leftLabel, rightLabel }: IProps) => {
  return (
    <div className="flex items-center gap-2">
      {leftLabel && <p>{leftLabel}</p>}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-gray-700" : "bg-gray-300"}
          relative inline-flex h-[27px] w-[51px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full ${
              enabled ? "bg-gray-300" : "bg-gray-700"
            }  shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      {rightLabel && <p>{rightLabel}</p>}
    </div>
  );
};

export default Toggle;
