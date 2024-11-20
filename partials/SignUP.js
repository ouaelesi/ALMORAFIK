import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import wilaya from "../data/TemporaryData/staticData/eng/wilaya";
import wilayaAr from "../data/TemporaryData/staticData/arab/wilayaAr";
import specialities from "../data/TemporaryData/staticData/eng/specialities";
import specialitiesAr from "../data/TemporaryData/staticData/arab/specialitiesAr";
import { useEdgeStore } from '../lib/edgestore';

const SignUP = ({ staticData, isStudent }) => {
  const { locale } = useRouter();
  const { edgestore } = useEdgeStore();
  const wilayas = locale === "arab" ? wilayaAr : wilaya;
  const specialitiesList = locale === "arab" ? specialitiesAr : specialities;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });

  const [backErrors, setBackErrors] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
  setBackErrors([]);
  const role = isStudent ? "student" : "teacher";

  // Upload profile picture to Edge Store
  let profilePictureUrl = "";
  const uploadProfilePicture = async () => {
    if (profilePicture) {
      try {
        console.log("Uploading profile picture...");
        const res = await edgestore.publicFiles.upload({
          file: profilePicture,
        });
        console.log("Profile picture uploaded:", res.url);
        return res.url;
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setBackErrors(["Error uploading profile picture"]);
        throw error;
      }
    }
    return "";
  };

  try {
    // Start the profile picture upload and form submission concurrently
    console.log("Starting profile picture upload...");
    const [uploadedUrl] = await Promise.all([uploadProfilePicture()]);

    profilePictureUrl = uploadedUrl;
    console.log("Profile picture URL:", profilePictureUrl);

    const formData = {
      userName: data.userName,
      email: data.email,
      hashPassword: data.hashPassword,
      wilaya: data.wilaya,
      speciality: data.speciality,
      level: data.level,
      role: role,
      profilePictureUrl: profilePictureUrl,
    };

    console.log("Submitting form data:", formData);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log("Fetch response status:", res.status);

    if (res.ok) {
      console.log("Form submission successful");
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.hashPassword,
      });
      if (result.error) {
        console.error("Sign-in error:", result.error);
        setBackErrors([result.error]);
      } else {
        router.push("/");
      }
    } else {
      const errorData = await res.json();
      console.error("Form submission error:", errorData.message);
      setBackErrors([errorData.message]);
    }
  } catch (error) {
    console.error("Error during form submission:", error);
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
            {staticData.signUp.profilePicture}
            <input
              className={`form-control ${
                locale === "arab" ? "text-end" : "text-start"
              } ${
                errors.profilePicture
                  ? "border-danger text-danger"
                  : "border-muted text-dark"
              }`}
              placeholder={staticData.signUp.profilePicturePlace}
              name="profilePicture"
              type="file"
              {...register("profilePicture", { required: false})}
              onChange={(e) => setProfilePicture(e.target.files[0])}
            ></input>
            {errors.profilePicture && (
              <div className="text-danger fs-6 fw-light">
                The Profile Picture is required
              </div>
            )}
            {isStudent ? (
              <>
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
              </>
            ) : (
              <>
                {staticData.signUp.justification}
                <input
                  className={`form-control ${
                    locale === "arab" ? "text-end" : "text-start"
                  } ${
                    errors.justification
                      ? "border-danger text-danger"
                      : "border-muted text-dark"
                  }`}
                  placeholder={staticData.signUp.justificationPlace}
                  name="justification"
                  type="file"
                  {...register("justification", { required: true })}
                ></input>
                {errors.justification && (
                  <div className="text-danger fs-6 fw-light">
                    The Justification is required
                  </div>
                )}
              </>
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