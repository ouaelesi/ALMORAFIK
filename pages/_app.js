// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useEffect, useState } from "react";
import { AuthProvider } from "../utils/AuthContext";
import App, { AppProps, AppContext } from "next/app";
import Head from "next/head";
import { IsLoggedIn } from "../utils/IsLoggedIn";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider from NextAuth.js

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import {
  Inter,
  Montserrat,
  Mada,
  El_Messiri,
  Cairo,
  Noto_Sans_Arabic,
  Rubik,
} from "next/font/google";
import { useRouter } from "next/router";
import { EdgeStoreProvider } from '../lib/edgestore';

//  If loading a variable font, you don't need to specify the font weight
const mada = Noto_Sans_Arabic({ subsets: ["arabic"] });
const rubicFont = Rubik({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();

  useEffect(() => {}, [locale]);

  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
      <EdgeStoreProvider>
        <Head>
          <meta name="msapplication-TileImage" content="/thumbnail.png"></meta>
          <meta property="og:site_name" content="SA9SINI WebSite"></meta>
          <meta
            property="og:title"
            content="Questions are everywhere, answers are on HERE
            So start ask your questions"
          ></meta>
          <meta
            property="og:description"
            content="A learning platform to ask questions about anything related to study in all subjects, offered for all majors that have a baccalaureate exam to find the answer from teachers, colleagues or bachelors."
          ></meta>
          <meta
            property="og:image"
            itemProp="image"
            content="/thumbnail.png"
          ></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:image:type" content="image/png"></meta>
          <meta property="og:image:width" content="500"></meta>
          <meta property="og:url" content="your_website_url_here"></meta>
          <meta charset="UTF-8"></meta>
          <title>{locale === "arab" ? "المرافق" : "ALMORAFIK"}</title>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <main
          className={
            locale === "arab" ? rubicFont.className : montserrat.className
          }
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </main>
        </EdgeStoreProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async (AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(AppContext);
  const req = await AppContext.ctx.req;
  console.log("=====+>", await IsLoggedIn(req));
  return {
    userLoggedIn: await IsLoggedIn(req),
    pageProps: appProps,
  };
};