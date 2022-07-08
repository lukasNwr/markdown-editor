import { useEffect, useState, useContext } from "react";
import DropdownMenu from "./dropdown.js";
// import { save } from 'save-file'
import FileSaver, { saveAs } from "file-saver";
// import { save } from "./utils";
import { TextDataContext } from "../pages/index";

const TopBar = () => {
  const [docTitle, setDocTitle] = useState("New Document");
  const { textData, setTextData } = useContext(TextDataContext);

  const handleDocTitleChange = (event) => {
    setDocTitle(event.target.value);
  };

  async function start() {
    // Prompt user to select any serial port.
    const port = await navigator.serial.requestPort();

    // Wait for the serial port to open.
    await port.open({ baudRate: 9600 });
  }

  useEffect(() => {
    if (docTitle === ".md") {
      setDocTitle("New Document");
    }
  }, [docTitle]);

  return (
    <>
      <div className="flex bg-lightShade h-16">
        <div className="w-auto maxc-h-16">
          <DropdownMenu />
        </div>
        {/* Main top bar area */}
        <div className="flex items-center w-full px-4  gap-4">
          <span className="uppercase text-whiteText font-manrope font-bold">
            Markdown
          </span>
          <div className="flex items-center justify-between w-full">
            <div className="flex">
              {/* File Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="h-5 m-3 mx-4"
              >
                <path
                  fill="#6a6b6f"
                  d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"
                />
              </svg>
              <div className="flex flex-col">
                <span className="text-darkText text-sm font-manrope font-regular">
                  Document Name
                </span>

                <input
                  placeholder={docTitle}
                  onChange={handleDocTitleChange}
                  className="text-sm text-whiteText font-manrope outline-none text-left bg-lightShade "
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Trash Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-5"
              >
                <path
                  fill="#6a6b6f"
                  d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                />
              </svg>
              <button
                className="flex bg-accent px-3 py-2 rounded-md text-whiteText font-manrope text-sm gap-2 items-center"
                onClick={() => {
                  // start();
                  var blob = new Blob([textData], {
                    type: "text/markdown;charset=utf-8",
                  });
                  FileSaver.saveAs(blob, docTitle);
                }}
              >
                {/* Save Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-4"
                >
                  <path
                    fill="#f0f1f2"
                    d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"
                  />
                </svg>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
