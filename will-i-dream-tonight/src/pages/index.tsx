import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Head from "next/head";
import {
  getMessageFromLocalStorage,
  setMessageToLocalStorage,
  clearMessageFromLocalStorage,
  shouldClearLocalStorage,
} from "../utils/localStorage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const storedMessage = getMessageFromLocalStorage();
    if (storedMessage) {
      setMessage(storedMessage);
    } else {
      setIsLoading(true);
      const loadingTimeout = setTimeout(() => {
        const randomMessage = Math.random() < 0.5 ? "Yes" : "No";
        setMessage(randomMessage);
        setMessageToLocalStorage(randomMessage);
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(loadingTimeout);
    }

    if (shouldClearLocalStorage()) {
      clearMessageFromLocalStorage();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Will I dream tonight?</title>
        <meta property="og:title" content="Will I dream tonight?" key="title" />
        <meta property="twitter:title" content="Will I dream tonight?" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          property="description"
          content="I'm up all day thinking, worrying, wondering ... will I dream tonight? "
        />
        <meta
          property="og:description"
          content="I'm up all day thinking, worrying, wondering ... will I dream tonight? "
        />
        <meta
          property="twitter:description"
          content="I'm up all day thinking, worrying, wondering ... will I dream tonight? "
        />
        <meta
          property="og:url"
          content="https://work.tom.so/will-i-dream-tonight"
        />
        <meta property="og:image" content="/will-i-dream-tonight/og.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="/will-i-dream-tonight/og.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/will-i-dream-tonight/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/will-i-dream-tonight/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/will-i-dream-tonight/favicon-16x16.png"
        />
        <link rel="manifest" href="/will-i-dream-tonight/site.webmanifest" />
      </Head>
      <main
        className={`flex min-h-full flex-col items-center justify-between bg-white dark:bg-black text-black dark:text-white ${inter.className}`}
      >
        <div className="flex items-center justify-center h-screen">
          {isLoading ? (
            <p className="text-xl font-medium">Will I dream tonight?</p>
          ) : (
            <p className="text-xl">{message}</p>
          )}
        </div>
      </main>
    </>
  );
}
