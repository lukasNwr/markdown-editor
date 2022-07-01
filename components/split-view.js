// Component built with help of this tutorial...
// https://blog.theodo.com/2020/11/react-resizeable-split-panels/

import React, {
  createRef,
  useCallback,
  useEffect,
  useState,
  createContext,
} from "react";

const MIN_WIDTH = 400;

export const PreviewToggleContext = createContext();

const LeftPanel = ({ children, leftWidth, setLeftWidth }) => {
  const leftRef = createRef();

  useEffect(() => {
    if (leftRef.current) {
      if (!leftWidth) {
        setLeftWidth(leftRef.current.clientWidth);
        return;
      }
      leftRef.current.style.width = `${leftWidth}px`;
    }
  }, [leftRef, leftWidth, setLeftWidth]);

  return <div ref={leftRef}>{children}</div>;
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }
      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

// TODO: toggling markdown (preview) pane messes up its width
// TODO: adding animation to markdown (preivew) pane toggle

const SplitView = ({ left, right }) => {
  const windowSize = useWindowSize();
  const [previewToggle, setPreviewToggle] = useState(false);

  const [leftWidth, setLeftWidth] = useState(windowSize.width);
  const [separatorXPos, setSeparatorXPos] = useState();
  const [dragging, setDragging] = useState(false);

  const splitPaneRef = createRef();

  const onMouseDown = (event) => {
    setSeparatorXPos(event.clientX);
    setDragging(true);
  };

  const onMouseMove = useCallback(
    (event) => {
      if (dragging && leftWidth && separatorXPos) {
        const newLeftWidth = leftWidth + event.clientX - separatorXPos;
        setSeparatorXPos(event.clientX);

        if (newLeftWidth < MIN_WIDTH) {
          setLeftWidth(MIN_WIDTH);
          return;
        }

        if (splitPaneRef.current) {
          const splitPaneWidth = splitPaneRef.current.clientWidth;
          if (newLeftWidth > splitPaneWidth - MIN_WIDTH) {
            setLeftWidth(splitPaneWidth - MIN_WIDTH);
            return;
          }
        }

        setLeftWidth(newLeftWidth);
      }
    },
    [dragging, leftWidth, separatorXPos, setSeparatorXPos, setLeftWidth]
  );

  const onMouseUp = useCallback(() => {
    setDragging(false);
  });

  useEffect(() => {
    if (previewToggle) {
      setLeftWidth(windowSize.width);
    } 

    if (leftWidth === undefined) {
      setLeftWidth(window.innerWidth / 2.02);
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <>
      <div
        ref={splitPaneRef}
        className="flex flex-row items-start w-full min-h-screen"
      >
        <LeftPanel
          className="h-full"
          leftWidth={leftWidth}
          setLeftWidth={setLeftWidth}
        >
          <PreviewToggleContext.Provider
            value={{ previewToggle, setPreviewToggle }}
          >
            {left}
          </PreviewToggleContext.Provider>
        </LeftPanel>
        <div
          className="flex flex-wrap items-center self-stretch cursor-col-resize"
          onMouseDown={onMouseDown}
        >
          <div className="w-[2px] h-full border-4 bg-lightShade border-lightShade" />
        </div>
        <div className={`grow h-full ${previewToggle ? "hidden" : "visible"}`}>
          <PreviewToggleContext.Provider
            value={{ previewToggle, setPreviewToggle }}
          >
            {right}
          </PreviewToggleContext.Provider>
        </div>
      </div>
    </>
  );
};

export default SplitView;
