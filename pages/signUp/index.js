import Cookies from "js-cookie";
import React, { Component, useContext, useEffect, useState } from "react";
import LoginSteps from "../../partials/LoginSteps";
import LoginForm from "../../partials/SignUP";
import { Store } from "../../utils/AuthContext";
import { useRouter } from "next/router";
import { authArData } from "../../data/TemporaryData/staticData/arab/authData";
import { authData } from "../../data/TemporaryData/staticData/eng/authData";
import Image from "next/image";
import Link from "next/link";
import { MODE } from "../../utils/prod";

function SignUp({ token }) {
  const { locale } = useRouter();

  const router = useRouter();
  const [logedIN, setLogedIn] = useState(token ? true : false);
  const [authStaticData, setData] = useState(authArData);

  useEffect(() => {
    locale === "arab" ? setData(authArData) : setData(authData);
  }, [locale]);

  if (MODE === "pre-Launch")
    return (
      <div className="h-screen w-full">
        <Image
          width={400}
          height={400}
          className="block mx-auto md:mt-28 md:w-1/4 w-4/4 mt-10"
          alt="in progress almorafik "
          src="/assets/imgs/inProgress.png"
        />
        <div className="px-4"> 
          <button className="btn btn_answer  w-full md:w-1/4 mx-auto mt-2 block">
            <Link href="/">GO HOME</Link>
          </button>
        </div>
      </div>
    );
  return (
    <>
      {/* this is the var from the context {myVar}
      <button className="bg-gray-50 w-fit h-fit mx-5 p-2" onClick={increment}>+</button>
      <button className="bg-gray-50 w-fit h-fit mx-5 p-2" onClick={increment}>-</button>
      <br/>
      this is the token {token ? "true" : "false"} */}

      <div
        className={`page_container row ${
          locale === "arab" ? "text-end" : "text-start"
        }`}
      >
        <div
          className={`col-12 col-md-6 d-flex justify-content-center ${
            locale === "arab" ? "order-2" : ""
          }`}
        >
          <LoginSteps staticData={authStaticData}></LoginSteps>
        </div>
        <div
          className={`col-12 col-md-6 d-flex justify-content-center ${
            locale === "arab" ? "order-1" : ""
          }`}
        >
          <LoginForm staticData={authStaticData}></LoginForm>
        </div>
      </div>
    </>
  );
}

export default SignUp;

// export function getServerSideProps({ req, res }) {
//   return { props: { token: req.cookies.OursiteJWT || "" } };
// }
