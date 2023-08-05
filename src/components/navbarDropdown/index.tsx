import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface IDropOptions {
  label: string;
  onClick: () => void;
}

interface IProps {
  options: IDropOptions[];
  orgLogo: string;
}

const NavDropDown = ({ options, orgLogo }: IProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
          <img
            className="h-10 w-10 flex-none rounded-full bg-gray-50"
            src={orgLogo}
            alt="Profile"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((item: IDropOptions, index: number) => (
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={item.onClick}
                    key={`${item.label}-${index}`}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm hover:bg-indigo-200 cursor-pointer"
                    )}
                  >
                    {item.label}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavDropDown;
