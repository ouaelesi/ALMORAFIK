import React, { useState } from "react";
import { useRouter } from "next/router";

const LogIn = () => {
  // The Next Router
  const router = useRouter();
  // User State will be updated from the login Form
  const [userInfo, setUserInfo] = useState({ email: "", hashPassword: "" });
  // This function will be executed when the user hit the login button
  const [ErrorMessage, setErrorMessage] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/logIn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (res.status === 200) {
      router.push("/");
      router.reload("/");
    } else {
      const err = ErrorMessage;
      err.push("Something went wrong ");
    }
  };
  // This function will update the user state
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="page_container row d-flex justify-content-center">
      <div className="login_container col-10 col-xl-3 col-lg-4 col-md-5 col-sm-8">
        <button className=" btn login_with_google">Login with Google</button>

        <button className=" btn login_with_facebook">
          Login with Facebook
        </button>
        <div>
          {ErrorMessage.map((elem, key) => (
            <div key={key} className="alert alert-danger" role="alert">
              Something went wrong !
            </div>
          ))}
        </div>
        <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group Loginstitles" id="usernamelogin">
            Email
            <input
              className="form-control  mb-4 fs-6"
              placeholder="Your Email here"
              name="email"
              onChange={handleChange}
            ></input>
            Password
            <input
              className="form-control mb-4"
              placeholder="Your password"
              type="password"
              name="hashPassword"
              onChange={handleChange}
            ></input>
            <button className="btn loginbtn btn-dark" type="submit">
              LOG IN
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          You Don t have an account?{" "}
          <a href="signUp" className="underline  fw-bold">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
