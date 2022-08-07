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
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import AuthContext from "../utils/AuthContext";

const Header = ({ token }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
    console.log("=================");
    if (!user) login(token);
  }, [token, user, login]);
  return (
    <div className="px-md-5 px-2 shadow-sm">
      <Navbar className="" light expand="md">
        <NavbarBrand href="/" className="px-2">
          <img src="/assets/imgs/logo.png" className="navlogo" width="145px" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="menuBurger" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto row nav" navbar>
            <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink href="./" className="navlink text-dark ">
                HOME
              </NavLink>
            </NavItem>
            <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink href="/questions" className="navlink text-dark ">
                QUESTIONS
              </NavLink>
            </NavItem>
            <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink href="/aboutUs" className="navlink text-dark ">
                ABOUT
              </NavLink>
            </NavItem>
            <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink className="navlink text-dark ">CONTACT</NavLink>
            </NavItem>

            {!user && (
              <NavItem className="navitem col-12 col-md-2  mx-auto">
                <NavLink
                  href="/logIn"
                  className="d-flex justify-content-center"
                >
                  {" "}
                  <Button className="signbutton login ">LOG IN</Button>
                </NavLink>
              </NavItem>
            )}
            {!user && (
              <NavItem className="navitem col-12 col-md-2  mx-auto">
                <NavLink
                  href="/signUp"
                  className=" d-flex justify-content-center"
                >
                  {" "}
                  <Button className="signbutton signup">SIGN UP</Button>
                </NavLink>
              </NavItem>
            )}
            {user && (
              <>
                <NavItem className="navitem col-12 col-md-1  mx-auto">
                  <NavLink
                    href="/Profil"
                    className=" d-flex gap-2 justify-content-center text-dark fs-6 fw-light underline"
                  >
                    Profil
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      style={{ marginTop: 2, fontSize: 20 }}
                    />
                  </NavLink>
                </NavItem>
                <NavItem className="col-12 col-md-1 ">
                  <NavLink
                    href="/Profil"
                    className="d-flex gap-2  justify-content-center text-dark "
                    onClick={(e) => userLogOut(e)}
                  >
                    <div className="fs-6 fw-light underline">LogOut</div>
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      style={{ marginTop: 2, fontSize: 20 }}
                    />
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
