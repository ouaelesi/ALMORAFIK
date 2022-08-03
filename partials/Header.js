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

import AuthContext from "../utils/AuthContext";

const Header = ({ token }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    login(token);
  }, [token, user, login]);
  return (
    <div className="px-md-5 px-2">
      <Navbar className="" light expand="md">
        <NavbarBrand href="/" className="px-2">
          <img src="/assets/imgs/logo.png" className="navlogo" width="145px" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="menuBurger" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto row nav" navbar>
            <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink href="./" className="navlink">
                HOME
              </NavLink>
            </NavItem>
            <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink href="/questions" className="navlink">
                QUESTIONS
              </NavLink>
            </NavItem>
            <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink href="/aboutUs" className="navlink">
                ABOUT
              </NavLink>
            </NavItem>
            <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink className="navlink">CONTACT</NavLink>
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
              <NavItem className="navitem col-12 col-md-2  mx-auto">
                <NavLink
                  href="/Profil"
                  className=" d-flex justify-content-center"
                >
                  Profil
                  <div className="bg-gray-200 p-3 rounded-md mx-2"></div>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
