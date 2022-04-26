import React, { Component, useState } from "react"
//import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, NavLink  } from 'reactstrap';




  const  Header = ({token}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);

    async function createSightingRequest(sightingData) {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sighting: sightingData }),
      });
      const data = await response.json();
      return data.sighting;
    }

    return (
      <div className="px-5">

        <Navbar className="" light expand="md">
          {token}
          <NavbarBrand href="/" className="px-2"><img src='/assets/imgs/logo.png' className="navlogo" width="145px"/></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto row nav" navbar>
              <NavItem className="navitem col-12 col-md-2  mx-auto">
                <NavLink href="./" className="navlink">HOME</NavLink>
              </NavItem>
              <NavItem className="navitem col-12 col-md-2  mx-auto">
                <NavLink href="/questions"className="navlink">QUESTIONS</NavLink>
              </NavItem>
              <NavItem className="navitem col-12 col-md-2  mx-auto">
                  <NavLink href="/aboutUs" className="navlink">ABOUT</NavLink>
              </NavItem >
              <NavItem className="navitem col-12 col-md-2  mx-auto">
                  <NavLink className="navlink">CONTACT</NavLink>
              </NavItem>

              <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink href="/logIn" className="d-flex justify-content-center">  <Button className="signbutton login "  >LOG IN</Button></NavLink>
    
              </NavItem>
              <NavItem className="navitem col-12 col-md-2  mx-auto">
              <NavLink href="/signUp" className=" d-flex justify-content-center">  <Button className="signbutton signup">SIGN UP</Button></NavLink>
              </NavItem>
            </Nav>
          
          </Collapse>
        
        </Navbar>
      </div>
    );
  }
  
  export default Header;


  export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.OursiteJWT || "" } };
  }