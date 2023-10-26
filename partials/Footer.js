import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faAt, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faGoogle,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";

import { footerData } from "../data/TemporaryData/staticData/eng/FooterData";
import { footerArData } from "../data/TemporaryData/staticData/arab/FooterData";
import { useRouter } from "next/router";

const Footer = () => {
  const { locale } = useRouter();

  const [footerStaticData, setFooterData] = useState(footerArData);

  useEffect(() => {
    locale === "arab" ? setFooterData(footerArData) : setFooterData(footerData);
  }, [locale]);
  return (
    <div className="footer">
      <div className={`d-md-flex  justify-content-between py-5 gap-3 ${locale==="arab" ? 'flex-row-reverse' : ''}`}>
        <div className="col-md-4 px-5">
          <img
           src={
            locale === "arab"
              ? "/assets/imgs/logoAr.png"
              : "/assets/imgs/logo.png"
          }
            width="180px"
            className="block mx-auto"
          />
          <div className="text-white mt-2 fs-6 text-center">
            {footerStaticData.description}
          </div>
          <img
            src="/assets/imgs/colorShapes.png"
            width="200px"
            className={`mt-7 mx-auto block ${
              locale === "arab" ? "ml-auto" : ""
            }  `}
          ></img>
        </div>
        <div className="col-md-4 px-5 text-white text-center">
          <div className=" fs-4 fw-bold mb-3 yellowText">
            {" "}
            {footerStaticData.informations}
          </div>
          <a className="fs-5 fw-semibold block mb-2">
            {" "}
            {footerStaticData.home}
          </a>
          <a className="fs-5 fw-semibold block mb-2">
            {" "}
            {footerStaticData.about}
          </a>
          <a className="fs-5 fw-semibold block mb-2">
            {" "}
            {footerStaticData.contact}
          </a>
          <a className="fs-5 fw-semibold block mb-2">
            {" "}
            {footerStaticData.questions}
          </a>
        </div>
        <div className="col-md-4 px-5 text-white fw-light text-center ">
          <div className=" fs-4 fw-bold mb-3 yellowText">
            {" "}
            {footerStaticData.contact}
          </div>
          <div className="d-flex gap-2 mb-3 w-fit mx-auto">
            <FontAwesomeIcon
              icon={faAt}
              style={{ marginTop: "5", fontSize: "20" }}
            />
            jo_sahbi@esi.dz
          </div>
          <div className="d-flex gap-2 mb-3 w-fit mx-auto">
            <FontAwesomeIcon
              icon={faPhone}
              style={{ marginTop: "5", fontSize: "20" }}
            />
            07 95 95 15 19
          </div>

          <div className="d-flex gap-4 mt-4 mb-3 w-fit mx-auto">
            <FontAwesomeIcon
              icon={faFacebookF}
              style={{ marginTop: "5", fontSize: "30" }}
            />
            <FontAwesomeIcon
              icon={faInstagram}
              style={{ marginTop: "5", fontSize: "30" }}
            />
            <FontAwesomeIcon
              icon={faGoogle}
              style={{ marginTop: "5", fontSize: "30" }}
            />
            <FontAwesomeIcon
              icon={faFacebookMessenger}
              style={{ marginTop: "5", fontSize: "30" }}
            />
          </div>
        </div>
      </div>

      <div className="col-12  py-2">
        <p className="footer_nav"> Copyright ©2023 ALMORAFIK Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
