import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { authArData } from "../../data/TemporaryData/staticData/arab/authData";
import { authData } from "../../data/TemporaryData/staticData/eng/authData";

const LogIn = () => {
  const { locale } = useRouter();

  const [authStaticData, setAuthData] = useState(authArData);
  useEffect(() => {
    locale === "arab" ? setAuthData(authArData) : setAuthData(authData);
  }, [locale]);

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
    <div
      className={`page_container row d-flex justify-content-center ${
        locale === "arab" ? "text-end" : "text-start"
      }`}
    >
      <div className="login_container col-10 col-xl-3 col-lg-4 col-md-5 col-sm-8">
        <button className=" btn login_with_google">
          {authStaticData.login.loginGoogle}
        </button>

        <button className=" btn login_with_facebook">
          {authStaticData.login.loginFaceBook}
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
            {authStaticData.login.email}
            <input
              className={`
              ${locale === "arab" ? "text-end" : "text-start"}
              ${
                errors.email
                  ? "border border-danger text-danger"
                  : "border border-dark"
              } form-control   fs-6 mb-0`}
              placeholder={authStaticData.login.emailPlace}
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
            <label className="mt-4">{authStaticData.login.password}</label>
            <input
              className={`
            
              ${locale === "arab" ? "text-end" : "text-start"}
              ${
                errors.hashPassword
                  ? "border border-danger text-danger"
                  : "border border-dark"
              } form-control   fs-6 mb-0`}
              placeholder={authStaticData.login.passwordPlace}
              type="password"
              name="hashPassword"
              required="true"
              {...register("hashPassword", { required: true })}
            ></input>
            {errors.hashPassword && (
              <p className="fs-6 text-danger fw-light ">Password is required</p>
            )}
            <button
              className="btn loginbtn btn-dark mt-4 text-light"
              type="submit"
              disabled={errors.email || errors.hashPassword}
            >
              {authStaticData.login.action}
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
