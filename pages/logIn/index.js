import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  // Form Validation
  const {
    register,
    getValues,
    formState: { errors, isDirty, isValid, isSubmitted },
  } = useForm({ mode: "onTouched" });

  // The Next Router
  const router = useRouter();

  // This function will be executed when the user hit the login button
  const [ErrorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async (e) => {
    setLoading(true);
    setErrorMessage(null);
    e.preventDefault();
    const userInfo = getValues();
    const res = await fetch("/api/users/logIn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    setLoading(false);
    if (res.status === 200) {
      router.push("/");
      router.reload("/");
    } else {
      setErrorMessage("Email Or Password not correct !!");
    }
  };

  return (
    <div className="page_container row d-flex justify-content-center">
      <div className="login_container col-10 col-xl-3 col-lg-4 col-md-5 col-sm-8">
        <button className=" btn login_with_google">Login with Google</button>

        <button className=" btn login_with_facebook">
          Login with Facebook
        </button>
        <div>
          {loading ? (
            <div className="spinner-border block mx-auto my-2" role="status">
              <span className="sr-only ">Loading...</span>
            </div>
          ) : ErrorMessage ? (
            <div className="alert alert-danger" role="alert">
              {ErrorMessage}
            </div>
          ) : (
            isSubmitted && (
              <div className="alert alert-success" role="alert">
                Welcome Again
              </div>
            )
          )}
        </div>
        <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group Loginstitles" id="usernamelogin">
            Email
            <input
              className={`${
                errors.email
                  ? "border border-danger text-danger"
                  : "border border-dark"
              } form-control   fs-6 mb-0`}
              placeholder="Your Email here"
              name="email"
              type="email"
              required="true"
              {...register("email", { required: true, minLength: 3 })}
            ></input>
            {errors.email && (
              <p className="fs-6 text-danger fw-light ">
                a Valid adress email is required
              </p>
            )}
            <label className="mt-4">Password</label>
            <input
              className={`${
                errors.hashPassword
                  ? "border border-danger text-danger"
                  : "border border-dark"
              } form-control   fs-6 mb-0`}
              placeholder="Your password"
              type="password"
              name="hashPassword"
              required="true"
              {...register("hashPassword", { required: true })}
            ></input>
            {errors.hashPassword && (
              <p className="fs-6 text-danger fw-light ">Password is required</p>
            )}
            <button
              className="btn loginbtn btn-dark mt-4"
              type="submit"
              disabled={errors.email || errors.hashPassword}
            >
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
