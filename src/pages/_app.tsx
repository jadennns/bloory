import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        pauseOnHover={false}
        draggable={false}
        theme='colored'
        pauseOnFocusLoss={false}
        position='top-center'
      />
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
