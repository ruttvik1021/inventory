"use client";

import { CloseIcon } from "@/utils/images/icons/closeIcon";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

const smallSize = "w-full sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 h-full";
const mediumSize = "w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 h-full";
const largeSize = "w-full h-full";

const Modal = ({
  children,
  show,
  setShow,
  onBlur,
  size,
}: {
  children: React.ReactNode;
  show: boolean;
  setShow: (state: boolean) => void;
  onBlur: boolean;
  size: "smallSize" | "mediumSize" | "largeSize";
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as={"div"}
        className={`fixed inset-0 z-10 overflow-y-auto bg-opacity-30 bg-blur-md bg-white backdrop-blur-md backdrop-opacity-50 p-8 rounded-lg shadow-lg`}
        initialFocus={cancelButtonRef}
        onClose={onBlur ? () => setShow(false) : () => setShow(true)} // This ensures the modal is closed only when this function is called
      >
        <div className={`flex items-center justify-center`}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`p-8 ${
                size === "smallSize"
                  ? smallSize
                  : size === "mediumSize"
                  ? mediumSize
                  : largeSize
              } relative bg-white rounded-3xl`}
            >
              <div className="absolute top-3 right-3 w-8">
                <CloseIcon
                  className="absolute top-3 right-3 w-8 cursor-pointer"
                  onClick={() => setShow(false)}
                />
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
