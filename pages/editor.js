import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import MarkdownDisplay from "../components/markdown-view";
import SplitView from "../components/split-view";
import TextInput from "../components/text-view";
import TopBar from "../components/topbar";

export const TextDataContext = createContext();
export const ScrollContext = createContext();
export const ScrollSync = createContext();

const Editor = () => {
  const router = useRouter();
  const query = router.query;

  const [textData, setTextData] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollSync, setScrollSync] = useState(false);

  useEffect(() => {
    setTextData(query.data);
  }, [query.data]);

  return (
    <TextDataContext.Provider value={{ textData, setTextData }}>
      <ScrollSync.Provider value={{ scrollSync, setScrollSync }}>
        <div className="flex flex-col max-h-[calc(100vh-6rem)]">
          <TopBar />
          <ScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
            <div className="flex flex-grow">
              <SplitView
                left={<TextInput />}
                right={
                  <div className="">
                    <MarkdownDisplay />
                  </div>
                }
              />
            </div>
          </ScrollContext.Provider>
        </div>
      </ScrollSync.Provider>
    </TextDataContext.Provider>
  );
};

export default Editor;
