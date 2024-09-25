import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import wilaya from "../data/TemporaryData/staticData/eng/wilaya";
import wilayaAr from "../data/TemporaryData/staticData/arab/wilayaAr";
import specialities from "../data/TemporaryData/staticData/eng/specialities";
import specialitiesAr from "../data/TemporaryData/staticData/arab/specialitiesAr";


const SignUP = ({ staticData }) => {
  const { locale } = useRouter();

  const wilayas = locale === "arab" ? wilayaAr : wilaya;
  const specialitiesList = locale === "arab" ? specialitiesAr : specialities;


  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });

  const [backErrors, setBackErrors] = useState([]);

  const router = useRouter();

  const onSubmit = async (data) => {
    setBackErrors([]);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.hashPassword,
      });

      if (result.error) {
        setBackErrors([result.error]);
      } else {
        router.push("/");
      }
    } else {
      const errorData = await res.json();
      setBackErrors([errorData.message]);
    }
  };

  return (
    <div>
      <div className="login_container">
        <button
          className="btn login_with_google"
          onClick={() => signIn("google")}
        >
          {staticData.signUp.loginGoogle}
        </button>
        <button
          className="btn login_with_facebook hover:text-white"
          onClick={() => signIn("facebook")}
        >
          {staticData.signUp.loginFaceBook}
        </button>
        <div>
          {backErrors.map((err, key) => (
            <div className="alert alert-danger" role="alert" key={key}>
              {err}
            </div>
          ))}
        </div>
        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group Loginstitles" id="usernamelogin">
            {staticData.signUp.userName}
            <input
              className={`form-control ${
                locale === "arab" ? "text-end" : "text-start"
              } ${
                errors.userName
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              placeholder={staticData.signUp.userNamePlace}
              type="text"
              name="userName"
              {...register("userName", { required: true, minLength: 3 })}
            ></input>
            {errors.userName && (
              <div className="text-danger fs-6 fw-light">
                The UserName must be greater or equal to 3 chars
              </div>
            )}
            {staticData.signUp.email}
            <input
              className={`form-control ${
                locale === "arab" ? "text-end" : "text-start"
              } ${
                errors.email
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              placeholder={staticData.signUp.emailPlace}
              type="email"
              name="email"
              {...register("email", {
                required: "The Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            ></input>
            {errors.email && (
              <div className="text-danger fs-6 fw-light">
                {errors.email.message}
              </div>
            )}
            {staticData.signUp.password}
            <input
              className={`form-control ${
                locale === "arab" ? "text-end" : "text-start"
              } ${
                errors.hashPassword
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              placeholder={staticData.signUp.passwordPlace}
              name="hashPassword"
              type="password"
              {...register("hashPassword", {
                minLength: 8,
                required: true,
              })}
            ></input>
            {errors.hashPassword && (
              <div className="text-danger fs-6 fw-light">
                The MinLength Must Be 8 chars
              </div>
            )}
            {staticData.signUp.wilaya}
            <select
              className={`form-control ${
                locale === "arab" ? "text-end" : "text-start"
              } ${
                errors.wilaya
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              name="wilaya"
              {...register("wilaya", { required: true })}
            >
              {wilayas.map((wilaya, index) => (
                <option key={index} value={wilaya.name}>
                  {wilaya.name}
                </option>
              ))}
            </select>
            {errors.wilaya && (
              <div className="text-danger fs-6 fw-light">
                The Wilaya is required
              </div>
            )}
            {staticData.signUp.level}
            <select
              className={`form-control ${
                locale === "arab" ? "text-end" : "text-start"
              } ${
                errors.level
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              name="level"
              {...register("level", { required: true })}
            >
              <option value="1AS">1AS</option>
              <option value="2AS">2AS</option>
              <option value="3AS">3AS</option>
            </select>
            {errors.level && (
              <div className="text-danger fs-6 fw-light">
                The Level is required
              </div>
            )}
            {staticData.signUp.speciality}
            <select
              className={`form-control ${
                locale === "arab" ? "text-end" : "text-start"
              } ${
                errors.speciality
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              name="speciality"
              {...register("speciality", { required: true })}
            >
              {specialitiesList.map((speciality, index) => (
                <option key={index} value={speciality.value}>
                  {speciality.name}
                </option>
              ))}
            </select>
            {errors.speciality && (
              <div className="text-danger fs-6 fw-light">
                The Speciality is required
              </div>
            )}
            <button
              disabled={!isValid || !isDirty}
              className="btn singinbtn"
              type="submit"
            >
              {staticData.signUp.action}
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          You already have an account?{" "}
          <a href="logIn" className="underline fw-bold">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUP;