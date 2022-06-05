import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import ReactMarkdown from "react-markdown";
import React, { useInput } from "react";
import TextInput from "../components/text-view";
import MarkdownDisplay from "../components/markdown-view";
import SplitView from "../components/split-view";
import TopBar from "../components/topbar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />

      <div>
        <SplitView
          left={
            <div className="">
              <TextInput />
            </div>
          }
          right={<div className="m-4">Right Item</div>}
        />
      </div>
    </div>
  );
}
