// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import cookies from "js-cookie";
import { useState } from "react";
import { StroeProvider } from "../utils/Store";
import App, { AppProps, AppContext } from "next/app";
import { IsLoggedIn } from "../utils/IsLoggedIn";

function MyApp({ Component, pageProps, userLoggedIn }) {
  const [cookiesName, setCookies] = useState(cookies.get("nom"));
  return (
    <StroeProvider>
      <Header token={userLoggedIn} />
      <Component {...pageProps} />
      <Footer />
    </StroeProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async (AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(AppContext);
  const req = await AppContext.ctx.req;
  return {
    userLoggedIn: IsLoggedIn(req),
    pageProps: appProps,
  };
};
