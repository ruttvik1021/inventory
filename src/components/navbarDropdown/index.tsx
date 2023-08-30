import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import useAuth from "@/utils/context/useAuth";
import { hoverStyleConfig, styleConfig } from "@/utils/styling/styleConfig";

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
  const pathName = usePathname();
  const { darkTheme } = useAuth();
  // const [hoverStyle, setHoverStyle] = useState<string>(styleConfig.darkThemeBg);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
          <img
            className={`h-10 w-10 flex-none rounded-full bg-gray-100`}
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
        <Menu.Items
          className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md ${
            darkTheme ? styleConfig.dropDownDark : styleConfig.dropDownLight
          }
            shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            {options.map((item: IDropOptions, index: number) => (
              <Menu.Item>
                <a
                  onClick={item.onClick}
                  key={`${item.label}-${index}`}
                  className={
                    `block px-4 py-2 text-sm hover:bg-indigo-${
                      darkTheme ? "400" : "200"
                    }  `
                    // ${
                    //   darkTheme
                    //     ? styleConfig.darkThemeText
                    //     : styleConfig.lightThemeText
                    // }
                  }
                >
                  {item.label}
                </a>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavDropDown;
