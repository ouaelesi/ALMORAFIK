import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faAt, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faGoogle,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="d-md-flex  justify-content-between py-5">
          <div className="col-md-4 px-5">
            <img
              src="/assets/imgs/logo_white.png"
              width="180px"
              className="block mx-auto"
            />
            <div className="text-white mt-2 fs-6 text-center">
              A learning platform to ask questions about everything related by
              studying in all materials , proposed for all the streams who have
              baccalaureate exam to find the answer from teachers , colleagues
              or baccalaurate holders
            </div>
          </div>
          <div className="col-md-4 px-5 text-white text-center">
            <div className=" fs-4 fw-bold mb-3 yellowText">INFORMATION</div>
            <a className="fs-5 fw-semibold block mb-2">Home</a>
            <a className="fs-5 fw-semibold block mb-2">Questions</a>
            <a className="fs-5 fw-semibold block mb-2">About Us</a>
            <a className="fs-5 fw-semibold block mb-2">Contact Us</a>
          </div>
          <div className="col-md-4 px-5 text-white fw-light text-center ">
            <div className=" fs-4 fw-bold mb-3 yellowText">CONTACT</div>
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
          <p className="footer_nav"> Copyright ©2020 SA9SINI Reserved.</p>
        </div>
      </div>
    );
  }
}
export default Footer;
