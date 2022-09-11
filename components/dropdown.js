import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useRef, useState } from "react";
import { TextDataContext } from "../pages/index";
import { clearTextData, loadFile } from "./utils";

const DropdownMenu = () => {
  const [effect, setEffect] = useState(false);
  const { textData, setTextData } = useContext(TextDataContext);

  const hamburgerLine = `h-1 w-6 my-[0.15rem] rounded-full bg-white transition ease transform duration-300`;

  const loadMarkdownTut = () => {
    const aboutMarkdown = "";
    fetch("./markdown.md")
      .then((row) => row.text())
      .then((text) => {
        aboutMarkdown = text;
        setTextData(text);
      });
  };

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
                  {/* NEW FILE Button */}
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-accent text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => {
                            clearTextData(setTextData);
                          }}
                        >
                          New file
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  {/* OPEN FILE Button */}
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div>
                          <button
                            className={`${
                              active ? "bg-accent text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => {
                              loadFile(setTextData);
                            }}
                          >
                            Open File
                          </button>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                  {/* ABOUT MARKDOWN Button */}
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-accent text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={loadMarkdownTut}
                        >
                          About Markdown
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
