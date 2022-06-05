// Component built with help of this tutorial...
// https://blog.theodo.com/2020/11/react-resizeable-split-panels/

import React, { createRef, useCallback, useEffect, useState } from "react";

const MIN_WIDTH = 50;

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

const SplitView = ({ left, right }) => {
  // TODO: figure out how to set size of the left side
  const windowSize = useWindowSize();
  //console.log(windowSize);

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
    if (leftWidth === undefined) {
      setLeftWidth(window.innerWidth / 2.1);
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
        className="h-screen flex flex-row items-start w-full "
      >
        <LeftPanel leftWidth={leftWidth} setLeftWidth={setLeftWidth}>
          {left}
        </LeftPanel>
        <div
          className="cursor-col-resize self-stretch flex items-center"
          onMouseDown={onMouseDown}
        >
          <div className="w-[2px] h-full border-4 bg-black border-black" />
        </div>
        <div className="flex flex-1">{right}</div>
      </div>
    </>
  );
};

export default SplitView;
