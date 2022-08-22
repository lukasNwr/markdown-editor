import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollContext, ScrollSync, TextDataContext } from "../pages/index";
import { PreviewToggleContext } from "./split-view";

const MarkdownDisplay = () => {
  const { textData, setTextData } = useContext(TextDataContext);
  const { previewToggle, setPreviewToggle } = useContext(PreviewToggleContext);
  const { scrollPosition, setScrollPosition } = useContext(ScrollContext);
  const [markdownView, setMarkdownViewRef] = useState(null);
  const { scrollSync, setScrollSync } = useContext(ScrollSync);

  useEffect(() => {
    if (!markdownView) {
      return undefined;
    }
    if (scrollSync) {
      markdownView.scrollTop = scrollPosition;
    }
  }, [markdownView, scrollPosition, scrollSync]);

  useEffect(() => {
    if (scrollSync) scrollToSmoothly(scrollPosition, 250, markdownView);
  }, [scrollSync, markdownView, scrollPosition]);

  function scrollToSmoothly(pos, time, element) {
    var currentPos = element.scrollTop;
    var start = null;
    if (time == null) time = 500;
    (pos = +pos), (time = +time);
    window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      var progress = currentTime - start;
      if (currentPos < pos) {
        element.scrollTo(
          0,
          ((pos - currentPos) * progress) / time + currentPos
        );
      } else {
        element.scrollTo(
          0,
          currentPos - ((currentPos - pos) * progress) / time
        );
      }
      if (progress < time) {
        window.requestAnimationFrame(step);
      } else {
        element.scrollTo(0, pos);
      }
    });
  }

  const handleScroll = () => {
    if (scrollSync) {
      setScrollPosition(markdownView.scrollTop);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="flex justify-between w-full bg-darkShade font-manrope font-regular text-bold text-lightText text-sm h-8 items-center px-2">
          <span className="uppercase mx-3">Preview</span>
          <button
            onClick={() =>
              previewToggle ? setPreviewToggle(false) : setPreviewToggle(true)
            }
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
        <div
          className="flex flex-1 overflow-auto break-words max-h-[calc(100vh-6rem)] w-full bg-mainBg p-4 "
          ref={setMarkdownViewRef}
          onScroll={handleScroll}
        >
          <ReactMarkdown
            components={{
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="MarkdownView bg-lightShade border-l-4 border-accent rounded-sm px-4 py-1"
                  {...props}
                />
              ),
              h5: ({ node, ...props }) => (
                <h5 className="text-accent font-bold text-lg" {...props} />
              ),
            }}
            // eslint-disable-next-line react/no-children-prop
            children={textData}
            remarkPlugins={[remarkGfm]}
            className="grow prose prose-invert text-darkText self-start h-full w-full overflow-scroll scrollbar-hide"
          />
        </div>
      </div>
    </>
  );
};

export default MarkdownDisplay;
