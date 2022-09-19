import { useContext } from "react";
import { ScrollSync } from "react-scroll-sync";
import { ScrollContext, TextDataContext } from ".";
import MarkdownDisplay from "../components/markdown-view";
import SplitView from "../components/split-view";
import TextInput from "../components/text-view";
import TopBar from "../components/topbar";

const Editor = () => {
  const [textData, setTextData] = useContext(TextDataContext);
  const [scrollSync, setScrollSync] = useContext(ScrollSync);
  const [scrollPosition, setScrollPosition] = useContext(ScrollContext);

  return (
    <div className="flex flex-col max-h-[calc(100vh-6rem)]">
      <TopBar />
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
    </div>
  );
};

export default Editor;
