import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import { onError } from "./libs/errorLib";
import { Nav } from 'react-bootstrap';
import Navbar from "react-bootstrap/Navbar";
import "./App.css";

function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
    setIsAuthenticating(false); // Set isAuthenticating to false after loading
  }  

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  // Render only when isAuthenticating is false
  return (
    !isAuthenticating && (
        <div className="App container py-3">
            <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
                <LinkContainer to="/">
                    <Navbar.Brand className="font-weight-bold text-muted">
                        Scratch
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav activeKey={window.location.pathname}>
                        {isAuthenticated ? (
                            <>
                              <LinkContainer to="/settings">
                                  <Nav.Link>Settings</Nav.Link>
                              </LinkContainer>
                              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                          <>
                            <LinkContainer to="/signup">
                              <Nav.Link>Signup</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                              <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                          </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <Routes />
            </AppContext.Provider>
        </div>
    )
 );

}

export default App;
