import React from "react";
import "./Home.css";
import logo from '../logo.png';
import { useAppContext } from "../libs/contextLib";

export default function Home() {
  const { isAuthenticated } = useAppContext();
  return (
    
    <div className="Home">
      {isAuthenticated ?
      <div className="lander">
        <h1><img src={logo} alt="logo" width="100" height="50"/></h1>
        <h1 className="text-muted">Welcome {localStorage.token}</h1>
      </div> : null}
    </div>
  );
}