import Head from "next/head";
import React, { createContext, useEffect, useState } from "react";
import {
  BsFillFileEarmarkPlusFill,
  BsFillFolderFill,
  BsMarkdown,
  BsMarkdownFill,
} from "react-icons/bs";

import Link from "next/link";
import Router from "next/router";
import { loadFile, loadMarkdownTut } from "../components/utils";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [fileData, setFileData] = useState("");

  useEffect(() => {
    const { pathname } = Router;
    if (pathname === "/" && fileData != "") {
      Router.push({ pathname: "/editor", query: { data: fileData } });
    }
  }, [fileData]);

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

      <div className="flex flex-col justify-between h-screen w-screen bg-mainBg items-center">
        <div className="flex flex-col w-full justify-center items-center pt-[5rem]">
          <span className="flex flex-row items-center font-manrope text-whiteText font-bold text-[10vh] ">
            <BsMarkdown className="mx-4 text-[12vh]" /> EMDIT
          </span>
          <span className="font-manrope text-lightText text-xl">
            Simple editor for creating, editing, and saving Markdown files
            online.
          </span>
        </div>
        <div className="flex flex-col gap-5 w-[20vw] font-manrope font-bold text-lightText  items-center">
          <Link href="/editor">
            <button className="flex items-center py-4 bg-lightShade hover:bg-lightShadeHover shadow-md w-full rounded-xl hover:text-accent">
              <BsFillFileEarmarkPlusFill className="mx-4 text-xl" />
              <span>New File</span>
            </button>
          </Link>

          {/* TO DO: Figure out how to load data and redirect to the page with loaded data...
            - Possible solution could be changing existing loadFile fcion, so that it would
              have two params, one setterFcion and one new page...  */}
          <button
            className="flex items-center py-4 bg-lightShade hover:bg-lightShadeHover shadow-md w-full rounded-xl hover:text-accent"
            onClick={() => {
              loadFile(setFileData);
            }}
          >
            <BsFillFolderFill className="mx-4 text-xl" />
            <span>Open File</span>
          </button>

          <button
            className="flex items-center py-4 bg-lightShade hover:bg-lightShadeHover shadow-md w-full rounded-xl hover:text-accent"
            onClick={() => {
              loadMarkdownTut(setFileData);
            }}
          >
            <BsMarkdownFill className="mx-4 text-xl" />
            <span>About Markdown</span>
          </button>
        </div>

        <div className="flex justify-center items-center w-full h-16 ">
          <span className="text-center text-darkText text-sm font-manrope">
            Created by Lukas Novorolnik <br /> 2022
          </span>
        </div>
      </div>
    </div>
  );
}
