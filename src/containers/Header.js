import React, { useState, useEffect } from "react";
import '../App.css';
import Routes from "../Routes";
import { useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { AppContext } from "../libs/contextLib";
import logo from '../logo.png';

function Header(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();
  return (
    <div>
      {props.isAuthenticated ? (
        <div className="sidebar-container">
          <div className="sidebar-logo">
            Assignment
</div>
          {
          <>
          <Navbar.Collapse id="basic-navbar-nav" style={{display:'block'}}>
            <Nav className="flex-column">
              <Nav.Link href="/Home" style={{color:'white'}}>Home</Nav.Link>
              <Nav.Link href="/Home" style={{color:'white'}}>Dashboard</Nav.Link>
              <NavDropdown title="Manage User" id="basic-nav-dropdown" style={{color:'white'}}>
                <NavDropdown.Item href="/Userlist">User List</NavDropdown.Item>
                <NavDropdown.Item href="/Userlist">User History</NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" >Separated link</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </>
          }
        </div>
      ) : ""
      }
      <div className="content-container">

        <div className="container-fluid">

          <Navbar collapseOnSelect bg="light" expand="md" className="mb-3" style={{ height: '52px' }}>
            <LinkContainer to="/">
              <Navbar.Brand className="font-weight-bold text-muted">
                <img src={logo} width="100" height="50" alt="Logo" />
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav activeKey={window.location.pathname}>
                {props.isAuthenticated ? (
                  <Nav.Link onClick={props.click}>Logout</Nav.Link>
                ) : (
                    <>
                      <LinkContainer to="/signup">
                        <Nav.Link>Signup</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/Login">
                        <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/Login">
                        <Nav.Link>Forgot Password</Nav.Link>
                      </LinkContainer>
                    </>
                  )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </div>
  )
}
export default Header;
