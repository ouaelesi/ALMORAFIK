import React, { useContext, useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  NavLink,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import AuthContext from "../utils/AuthContext";
import Link from "next/link";
import LangSwitcher from "./shared/LangSwitcher";

import { headerData } from "../data/TemporaryData/staticData/arab/headerData";
import {
  headerDataEng,
  hederDataEng,
} from "../data/TemporaryData/staticData/eng/headerDataEng";

const Header = ({ token }) => {
  const { locale } = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="px-md-5 px-2 nav ">
      <div
        className={` ${
          locale === "arab" ? "flex-row-reverse" : ""
        } d-flex    justify-content-between py-3 w-100`}
      >
        <Link href="/" className="px-2">
          <img src="/assets/imgs/logo.png" className="navlogo" width="145px" />
        </Link>
        <Links token={token} classNames="d-none d-md-flex w-100" />
        <div className="d-block d-md-none" onClick={toggle}>
          <FontAwesomeIcon
            icon={isOpen ? faX : faBars}
            style={{ marginTop: 4, fontSize: 30 }}
          />
        </div>
      </div>
      {isOpen && (
        <div className="w-100">
          <Links token={token} classNames="d-block d-md-none" />
        </div>
      )}
    </div>
  );
};

export default Header;

const Links = ({ token, classNames }) => {
  // next router
  const router = useRouter();
  const { locale } = useRouter();

  //state

  const [navData, setNavData] = useState(headerData);

  const { login, user } = useContext(AuthContext);
  const userLogOut = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (res.status === 200) {
      router.push("/");
      router.reload("/");
    } else {
      const err = ErrorMessage;
      err.push("Something went wrong ");
    }
  };
  useEffect(() => {
    if (!user) login(token);
  }, [token, user, login]);

  useEffect(() => {
    locale === "arab" ? setNavData(headerData) : setNavData(headerDataEng);
  }, [locale]);
  return (
    <div
      className={` ${
        locale === "arab" ? "flex-row-reverse" : ""
      }    justify-content-between   d-block  w-100   ${classNames}`}
    >
      <div
        className={` ${
          locale === "arab" ? "flex-row-reverse" : ""
        } d-md-flex  d-block  justify-content-around w-100 w-md-100     `}
      >
        <Link href="./" className="navlink text-dark   d-block">
          {navData.links.home}
        </Link>
        <Link href="/questions" className="navlink text-dark d-block">
          {navData.links.questions}
        </Link>
        <Link href="/resources" className="navlink text-dark d-block">
          {navData.links.resources}
        </Link>
        <Link href="/aboutUs" className="navlink text-dark d-block">
          {navData.links.about}
        </Link>
        <Link href="/aboutUs" className="navlink text-dark d-block">
          {navData.links.contact}
        </Link>
      </div>
      <div
        className={` ${
          locale === "arab" ? "flex-row-reverse" : ""
        } d-md-flex  w-md-fit  mx-auto   justify-content-between`}
      >
        <div className="mx-3 mt-1">
          {!user && (
            <Link href="/logIn" className="d-flex justify-content-center">
              <Button className="signbutton login ">
                {" "}
                {navData.actions.login}
              </Button>
            </Link>
          )}
        </div>
        <div className="mx-3 mt-1">
          {!user && (
            <Link href="/signUp" className=" d-flex justify-content-center">
              <Button className="signbutton signup">
                {" "}
                {navData.actions.signup}
              </Button>
            </Link>
          )}
        </div>
        <div className="mx-2 mt-1">
          {user && (
            <div
              className={` pt-2 d-flex gap-2
               ${locale === "arab" ? " flex-row-reverse" : ""}
               `}
            >
              <Link
                href="/Profil"
                className={`d-flex gap-2 justify-content-center text-dark fs-6  underline ${
                  locale === "arab" ? "flex-row-reverse" : ""
                }`}
              >
                {navData.actions.profile}
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ marginTop: 2, fontSize: 20 }}
                />
              </Link>

              <Link
                href="/Profil"
                className={`d-flex gap-2 justify-content-center text-dark fs-6  underline ${
                  locale === "arab" ? "flex-row-reverse" : ""
                }`}
                onClick={(e) => userLogOut(e)}
              >
                <div className="fs-6  underline"> {navData.actions.logOut}</div>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  style={{ marginTop: 2, fontSize: 20 }}
                />
              </Link>
            </div>
          )}
        </div>
        <div className="mx-2  mt-1">
          <LangSwitcher />
        </div>
      </div>
    </div>
  );
};
