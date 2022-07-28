import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const SignUP = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    signUp(e);
  };

  const signUp = async (e) => {
    e.preventDefault();
    const UserData = getValues();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    });

    if (res.status == 200) {
      router.push("/");
      router.reload(window.location.pathname);
    }
  };
  return (
    <div>
      <div className="login_container">
        <button disabled="true" className=" btn login_with_google">
          Login with Google
        </button>
        <button disabled="true" className=" btn login_with_facebook">
          Login with Facebook
        </button>
        <form
          className="login_form"
          onSubmit={(e) => handleSubmit(onSubmit(e))}
        >
          <div className="form-group Loginstitles" id="usernamelogin">
            User Name
            <input
              className={`form-control ${
                errors.userName
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              placeholder="User Name here"
              type="text"
              name="userName"
              {...register("userName", { required: true, minLength: 3 })}
            ></input>
            {errors.userName && (
              <div className="text-danger fs-6 fw-light">
                The UserName must be grater or equal to 3 chars
              </div>
            )}
            Email
            <input
              className={`form-control ${
                errors.email
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              placeholder="Email Adress"
              type="email"
              name="email"
              {...register("email", { required: true })}
            ></input>
            {errors.email && (
              <div className="text-danger fs-6 fw-light">
                The Email is required
              </div>
            )}
            Password
            <input
              className={`form-control ${
                errors.hashPassword
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              placeholder="Password"
              name="hashPassword"
              type="password"
              {...register("hashPassword", { minLength: 8 })}
            ></input>
            {errors.hashPassword && (
              <div className="text-danger fs-6 fw-light">
                The MinLenght Must Be 8 chars
              </div>
            )}
            <button
              disabled={!isValid || !isDirty}
              className="btn singinbtn"
              type="submit"
            >
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUP;
