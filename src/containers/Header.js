import React, { useState, useEffect } from "react";
import '../App.css';
import Routes from "../Routes";
import { useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
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
          <ul className="sidebar-navigation">
            <li className="header">Navigation</li>
            <li>
              <a href="/Home">
                <i className="fa fa-home" aria-hidden="true"></i> Homepage
    </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-tachometer" aria-hidden="true"></i> Manage User
    </a>
              <ul className="nav-pills nav-stacked" style={{ listStyleType: 'none' }}>
                <li><a href="/Userlist">User List</a></li>
                <li><a href="#">User History</a></li>
              </ul>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-users" aria-hidden="true"></i> Manage Customer
    </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-cog" aria-hidden="true"></i> Settings
    </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-info-circle" aria-hidden="true"></i> Information
    </a>
            </li>
          </ul>
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
