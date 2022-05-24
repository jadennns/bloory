import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/Logo.png",
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
