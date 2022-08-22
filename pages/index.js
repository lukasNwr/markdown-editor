import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, createContext } from "react";
import TextInput from "../components/text-view";
import MarkdownDisplay from "../components/markdown-view";
import SplitView from "../components/split-view";
import TopBar from "../components/topbar";

export const TextDataContext = createContext();
export const ScrollContext = createContext();
export const ScrollSync = createContext();

export default function Home() {
  const [textData, setTextData] = useState("Default Text");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollSync, setScrollSync] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Markdown Editor</title>
        <meta
          name="description"
          content="Online text editor for creating, saving and editing markdown files."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TextDataContext.Provider value={{ textData, setTextData }}>
        <ScrollSync.Provider value={{ scrollSync, setScrollSync }}>
          <div className="flex flex-col max-h-[calc(100vh-6rem)]">
            <TopBar />
            <ScrollContext.Provider
              value={{ scrollPosition, setScrollPosition }}
            >
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
    </div>
  );
}
