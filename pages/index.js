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

  // useEffect(() => {
  //   console.log(scrollPosition)
  // }, [scrollPosition])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col max-h-[calc(100vh-6rem)]">
        <TextDataContext.Provider value={{ textData, setTextData }}>
          <ScrollSync.Provider value={{ scrollSync, setScrollSync }}>
            <TopBar />
          </ScrollSync.Provider>
        </TextDataContext.Provider>

        <div className="flex flex-grow">
          <SplitView
            left={
              <TextDataContext.Provider value={{ textData, setTextData }}>
                <ScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
                  <ScrollSync.Provider value={{ scrollSync, setScrollSync }}>
                    <TextInput />
                  </ScrollSync.Provider>
                </ScrollContext.Provider>
              </TextDataContext.Provider>
            }
            right={
              <div className="">
                <TextDataContext.Provider value={{ textData, setTextData }}>
                  <ScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
                    <ScrollSync.Provider value={{ scrollSync, setScrollSync }}>
                      <MarkdownDisplay />
                    </ScrollSync.Provider>
                  </ScrollContext.Provider>
                </TextDataContext.Provider>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
