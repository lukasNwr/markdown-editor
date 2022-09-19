import Head from "next/head";
import React, { createContext, useState } from "react";
import MarkdownDisplay from "../components/markdown-view";
import SplitView from "../components/split-view";
import TextInput from "../components/text-view";
import TopBar from "../components/topbar";
import styles from "../styles/Home.module.css";

export const TextDataContext = createContext();
export const ScrollContext = createContext();
export const ScrollSync = createContext();

export default function Home() {
  const [textData, setTextData] = useState("");
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

      <div className="flex flex-col h-screen w-screen bg-mainBg items-center">
        <div className="flex flex-col w-full justify-center items-center p-[10rem]">
          <span className=" font-manrope text-whiteText font-bold text-[10vh] ">
            EMDIT
          </span>
          <span className="font-manrope text-lightText text-xl">
            Simple editor for creating, editing, and saving Markdown files
            online.
          </span>
        </div>
        <div className="flex flex-col gap-5 w-[20vw] font-manrope font-bold text-lightText  items-center">
          <button className="flex items-center py-4 bg-lightShade hover:bg-lightShadeHover shadow-md w-full rounded-xl hover:text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="h-5 mx-4"
            >
              <path
                fill="#6a6b6f"
                d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"
              />
            </svg>
            <span>New File</span>
          </button>
          <button className="py-4 bg-lightShade hover:bg-lightShadeHover shadow-md w-full rounded-xl hover:text-accent">
            Open File
          </button>
          <button className="py-4 bg-lightShade hover:bg-lightShadeHover shadow-md w-full rounded-xl hover:text-accent">
            About Markdown
          </button>
        </div>
      </div>
    </div>
  );
}
