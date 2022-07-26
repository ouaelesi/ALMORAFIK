import Cookies from "js-cookie";
import React, { Component, useContext, useEffect, useState } from "react";
import LoginSteps from "../../partials/LoginSteps";
import LoginForm from "../../partials/SignUP";
import { Store } from "../../utils/AuthContext";
import { useRouter } from "next/router";

function SignUp({ token }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { myVar } = state;
  const [logedIN, setLogedIn] = useState(token ? true : false);
  const increment = () => {
    dispatch({ type: "increment" });
    Cookies.set("myCookies", myVar + 1);
  };
  return (
    <>
      {/* this is the var from the context {myVar}
      <button className="bg-gray-50 w-fit h-fit mx-5 p-2" onClick={increment}>+</button>
      <button className="bg-gray-50 w-fit h-fit mx-5 p-2" onClick={increment}>-</button>
      <br/>
      this is the token {token ? "true" : "false"} */}

      <div className="page_container row">
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <LoginSteps></LoginSteps>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center">
          {" "}
          <LoginForm></LoginForm>
        </div>
        <button className="bg-red-500 w-fit"> logout </button>
      </div>
    </>
  );
}

export default SignUp;

// export function getServerSideProps({ req, res }) {
//   return { props: { token: req.cookies.OursiteJWT || "" } };
// }
