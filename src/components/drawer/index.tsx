import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Drawer = ({
  children,
  show,
  setShow,
  title,
}: {
  children: React.ReactNode;
  show: boolean;
  setShow: any;
  title?: string;
}) => {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShow}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 my-1">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md ">
                  <div className="flex h-full flex-col overflow-y-scroll bg-gray-100 py-1 shadow-xl rounded-xl">
                    <div
                      className={`flex px-1 sm:px-1 border-b pb-2 ${
                        title ? "justify-between" : "justify-end"
                      }`}
                    >
                      {title && (
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          {title}
                        </Dialog.Title>
                      )}
                      <button
                        type="button"
                        className="relative rounded-md text-red-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={setShow}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="relative flex-1 px-2 sm:px-1 ">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
