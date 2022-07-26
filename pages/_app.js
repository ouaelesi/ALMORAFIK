// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AuthProvider } from "../utils/AuthContext";
import App, { AppProps, AppContext } from "next/app";
import { IsLoggedIn } from "../utils/IsLoggedIn";
import { useContext } from "react";
import AuthContext from "../utils/AuthContext";

function MyApp({ Component, pageProps, userLoggedIn }) {
  //const { login, error, user, isLoad } = useContext(AuthContext);

  useEffect(() => {
    console.log("App Cbn");
  }, []);
  return (
    <AuthProvider>
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

  return {
    userLoggedIn: IsLoggedIn(req),
    pageProps: appProps,
  };
};
