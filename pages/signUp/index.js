import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import LoginSteps from "../../partials/LoginSteps";
import LoginForm from "../../partials/SignUP";
import { useRouter } from "next/router";
import { authArData } from "../../data/TemporaryData/staticData/arab/authData";
import { authData } from "../../data/TemporaryData/staticData/eng/authData";
import Image from "next/image";
import Link from "next/link";
import { MODE } from "../../utils/prod";
import RoleToggle from "../../partials/RoleToggle";

function SignUp({ token }) {
  const { locale } = useRouter();

  const router = useRouter();
  const [logedIN, setLogedIn] = useState(token ? true : false);
  const [authStaticData, setData] = useState(authArData);

  useEffect(() => {
    locale === "arab" ? setData(authArData) : setData(authData);
  }, [locale]);
  const [isStudent, setIsStudent] = useState(true);

  const toggleRole = () => {
    setIsStudent(!isStudent);
  };

  return (
    <>
      <div
        className={`page_container row ${
          locale === "arab" ? "text-end" : "text-start"
        }`}
      >
        <RoleToggle isStudent={isStudent} toggleRole={toggleRole} />
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
          <LoginForm staticData={authStaticData} isStudent={isStudent}></LoginForm>
        </div>
      </div>
    </>
  );
}

export default SignUp;

// export function getServerSideProps({ req, res }) {
//   return { props: { token: req.cookies.OursiteJWT || "" } };
// }