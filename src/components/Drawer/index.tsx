import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment } from "react";

interface sizesType {
  lg: string;
  md: string;
  sm: string;
  xl: string;
}

interface IDrawer {
  isOpen: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
  size?: String;
  footer?: React.ReactNode;
}

const Drawer = ({ isOpen, header, size = "md", footer, children }: IDrawer) => {
  const sizes = {
    xl: "max-w-5xl",
    lg: "max-w-4xl",
    md: "max-w-3xl",
    sm: "max-w-2xl",
  };

  const drawerSize = sizes[size as keyof sizesType];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <div className="fixed inset-0 bg-black/60" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-[75px] flex max-w-full sm:pr-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div
                  className={clsx("pointer-events-auto w-screen", drawerSize)}
                >
                  {children}
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
