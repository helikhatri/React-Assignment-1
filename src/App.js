import React, { useState, useEffect } from "react";
import className from './App.css';
import Routes from "./Routes";
import Header from "./containers/Header";
import { useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import logo from './logo.png';
let path=window.location.pathname;
function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      if(typeof localStorage.token !== 'undefined') {
        userHasAuthenticated(true);
      }
      else
      {
        history.push('/Login');
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }
  
  function handleLogout() {
    userHasAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    history.push('/Login');
  }
  return (
    !isAuthenticating && (
    <div className="Signup">
    <div className="App container py-3">
    <Header isAuthenticated={isAuthenticated} click={handleLogout}></Header>
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Routes isAuthenticated={isAuthenticated} />
    </AppContext.Provider>
  </div>
  </div>
  )
  )
}

export default App;
