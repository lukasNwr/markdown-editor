import React, { useState, useContext, useRef, useEffect } from "react";
import { TextDataContext } from "../pages/index";
import { PreviewToggleContext } from "./split-view";
import { ScrollContext } from '../pages/index';
import { ScrollSync } from "../pages/index";
import useUndoableState from '../components/undoRedo';

const TextInput = () => {
  const { textData, setTextData } = useContext(TextDataContext);
  const { previewToggle, setPreviewToggle } = useContext(PreviewToggleContext);
  const { scrollPosition, setScrollPosition } = useContext(ScrollContext);
  const { scrollSync, setScrollSync } = useContext(ScrollSync);

  const textareaRef = useRef(null);

  const {
    state: doc,
    setState: setDoc,
    resetState: resetDoc,
    index: docStateIndex,
    lastIndex: docStateLastIndex,
    goBack: undoDoc,
    goForward: redoDoc
  } = useUndoableState(textData);

  const canUndo = docStateIndex > 0;
  const canRedo = docStateIndex < docStateLastIndex;

  useEffect(() => {
    textareaRef.current.scrollTop = scrollPosition
    setTextData(doc.text);
  }, [scrollPosition, doc.text, setTextData])

  const handleInput = (event) => {
    setDoc({ text: event.target.value });
  };

  const handleScroll = () => {
    setScrollPosition(textareaRef.current.scrollTop);
    // console.log('scroll position:' + scrollPosition);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className=" flex w-full bg-darkShade font-manrope font-regular text-bold text-lightText text-sm h-8 items-center px-2 justify-between">
        <span className="uppercase mx-3">markdown</span>
        <div className='flex gap-2'>
          <button onClick={() => undoDoc()} disabled={!canUndo} title="Undo" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-4'>
              <path className={`${canUndo ? 'fill-lightText' : 'fill-darkText'}`} d="M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.84 0-95.17-15.58-134.2-44.86c-14.12-10.59-16.97-30.66-6.375-44.81c10.59-14.12 30.62-16.94 44.81-6.375c27.84 20.91 61 31.94 95.88 31.94C344.3 415.8 416 344.1 416 256s-71.69-159.8-159.8-159.8c-37.46 0-73.09 13.49-101.3 36.64l45.12 45.14c17.01 17.02 4.955 46.1-19.1 46.1H35.17C24.58 224.1 16 215.5 16 204.9V59.04c0-24.04 29.07-36.08 46.07-19.07l47.6 47.63C149.9 52.71 201.5 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z" />
            </svg>
          </button>
          <button onClick={() => redoDoc()} disabled={!canRedo} title="Redo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-4'>
              <path className={`${canRedo ? 'fill-lightText' : 'fill-darkText'}`} d="M468.9 32.11c13.87 0 27.18 10.77 27.18 27.04v145.9c0 10.59-8.584 19.17-19.17 19.17h-145.7c-16.28 0-27.06-13.32-27.06-27.2c0-6.634 2.461-13.4 7.96-18.9l45.12-45.14c-28.22-23.14-63.85-36.64-101.3-36.64c-88.09 0-159.8 71.69-159.8 159.8S167.8 415.9 255.9 415.9c73.14 0 89.44-38.31 115.1-38.31c18.48 0 31.97 15.04 31.97 31.96c0 35.04-81.59 70.41-147 70.41c-123.4 0-223.9-100.5-223.9-223.9S132.6 32.44 256 32.44c54.6 0 106.2 20.39 146.4 55.26l47.6-47.63C455.5 34.57 462.3 32.11 468.9 32.11z" />
            </svg>
          </button>
          <button
            onClick={() =>
              previewToggle ? setPreviewToggle(false) : setPreviewToggle(true)
            }
            className={`${previewToggle ? "block" : "hidden"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="h-4"
            >
              <path
                fill="#6a6b6f"
                d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"
              />
            </svg>
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        className="flex-grow w-full max-h-[calc(100vh-6rem)] bg-mainBg text-darkText outline-none text-left font-sourceCodePro p-4 placeholder-darkText"
        onChange={(event) => {
          handleInput(event);
        }
        }
        placeholder="Enter Input"
        onScroll={handleScroll}
        value={doc.text}
      />
    </div>
  );
};

export default TextInput;
