// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import cookies from "js-cookie";
import { useState } from "react";
import { StroeProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  const [cookiesName, setCookies] = useState(cookies.get("nom"));
  return (
    <StroeProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </StroeProvider>
  );
}

export default MyApp;
