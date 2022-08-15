// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AuthProvider } from "../utils/AuthContext";
import App, { AppProps, AppContext } from "next/app";
import Head from "next/head";
import { IsLoggedIn } from "../utils/IsLoggedIn";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps, userLoggedIn }) {
  //const { login, error, user, isLoad } = useContext(AuthContext);
  const [LoggedIn, setLogin] = useState(false);

  useEffect(() => {}, []);
  return (
    <AuthProvider>
      <Head>
        <meta
          name="msapplication-TileImage"
          content="/imgs/thumbnail.png"
        ></meta>

        <meta property="og:site_name" content="Indexa Hearing Solutions"></meta>
        <meta
          property="og:title"
          content="HELPING TO IPMROVE THEIR LIVES"
        ></meta>
        <meta
          property="og:description"
          content="Equipements et services adaptées et destinées aux adultes et aux enfants."
        ></meta>
        <meta
          property="og:image"
          itemProp="image"
          content="/imgs/thumbnail.png"
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:image:type" content="image/png"></meta>
        <meta property="og:image:width" content="500"></meta>
        <meta property="og:url" content="your_website_url_here"></meta>
        <title>SASINI</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header token={userLoggedIn} userLoggedIn={userLoggedIn} />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
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
