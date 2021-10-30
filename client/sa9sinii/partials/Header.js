import React, { Component, useState } from "react"
//import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, NavLink  } from 'reactstrap';




  const  Header = (props) => {
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
      <div>
        <Navbar className="nav_container" light expand="md">
          <NavbarBrand href="/home"><img src='/assets/imgs/logo.png' className="navlogo"/></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto row nav" navbar>
              <NavItem className="navitem col-12 col-md-2  mx-auto">
                <NavLink href="./home" className="navlink">HOME</NavLink>
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