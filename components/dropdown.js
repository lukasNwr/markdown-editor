import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

const DropdownMenu = () => {
  const [effect, setEffect] = useState(false);

  const hamburgerLine = `h-1 w-6 my-[0.15rem] rounded-full bg-white transition ease transform duration-300`;

  return (
    <div className="top-0 left-0 max-h-16">
      <Menu as="div" className="relative inline-block text-center">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                onClick={() => {
                  setEffect(true);
                }}
                onAnimationEnd={() => {
                  setEffect(false);
                }}
                //className="inline-flex w-full justify-center "
                className="flex flex-col h-16 w-16 justify-center items-center group"
              >
                <div
                  className={`${hamburgerLine} ${
                    open
                      ? "rotate-45 translate-y-[0.55rem] bg-accent"
                      : "bg-darkText group-hover:bg-lightText"
                  }`}
                />
                <div
                  className={`${hamburgerLine} ${
                    open ? "opacity-0" : "bg-darkText group-hover:bg-lightText"
                  }`}
                />
                <div
                  className={`${hamburgerLine}  ${
                    open
                      ? "-rotate-45 -translate-y-[0.55rem] bg-accent"
                      : "bg-darkText group-hover:bg-lightText"
                  }`}
                />

                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className={`w-16 h-16 px-5 py-2 mx-2 transform ease-in-out duration-300 ${
                    open ? "rotate-90" : "rotate-0"
                  }`}
                >
                  <path
                    className={`transform transition ease-in-out duration-400 ${
                      effect && "animate-scale"
                    } ${open ? "fill-accent" : "fill-whiteText"}`}
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                  />
                </svg> */}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              show={open}
              enter="transition ease-out duration-200"
              enterFrom="transition opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div>
                <Menu.Items
                  static
                  className="absolute left-2 mt-1 w-52 origin-top-left divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md "
                >
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-accent text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          New file
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-accent text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Open file
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-accent text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Something else
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </div>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
