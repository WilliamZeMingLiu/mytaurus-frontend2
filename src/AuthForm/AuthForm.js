import { useState, Fragment, useEffect } from "react";
import { Card, Menu, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { auth, authUI } from "../firebase";

import firebase from "firebase"

import "./AuthForm.css";
import Home from "../Home/Home";

import { Redirect } from 'react-router-dom';

import { withRouter } from "react-router";


function renderLoggedIn() {
  return (
    <Redirect to="/" />
  );
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  auth.onAuthStateChanged((user) => setUser(user));

  async function authenticateUser(email, password, isLogin) {
    try {
      const user = isLogin
        ? await auth.signInWithEmailAndPassword(email, password)
        : await auth.createUserWithEmailAndPassword(email, password);
      console.log(user);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }

  useEffect(() => {
    if (!user) {
      authUI.start(".google-login", {
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        firebase.auth.TwitterAuthProvider.PROVIDER_ID,],
        signInFlow: "redirect",
      });
    }
  }, [user]);

  return (
    <div className="auth-form-wrapper">
      <Card className="auth-form-card">
        <Card.Content>
          {user ? (
            renderLoggedIn()
          ) : (
            <Fragment>
              <Card.Header className="auth-form-header">Auth Form</Card.Header>
              <Menu compact secondary>
                <Menu.Item
                  name="Login"
                  onClick={() => setIsLogin(true)}
                  active={isLogin}
                ></Menu.Item>
                <Menu.Item
                  name="Sign up"
                  onClick={() => setIsLogin(false)}
                  active={!isLogin}
                ></Menu.Item>
              </Menu>
              {isLogin ? (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email</label>
                      <input
                        placeholder="Email Address"
                        name="loginEmail"
                        type="email"
                        value={loginEmail || ""}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password</label>
                      <input
                        placeholder="Password"
                        name="loginPassword"
                        type="password"
                        value={loginPassword || ""}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    {error !== null && (
                     <div className="py-4 bg-red-600 w-full text-white text-center mb-3" style={{color: '#ff3d00'}}>
                      {error}                       
                     </div>
                   )}
                    <Button
                      onClick={() => authenticateUser(loginEmail, loginPassword, true)}
                      className="auth-form-buttons"
                      color="green"
                    >
                      Login
                    </Button>
                  </Form>
                  <div className="google-login"></div>
                </Fragment>
              ) : (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email</label>
                      <input
                        placeholder="Email Address"
                        name="signUpEmail"
                        type="email"
                        value={signupEmail || ""}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password</label>
                      <input
                        placeholder="Password"
                        name="signUpPassword"
                        type="password"
                        value={signupPassword || ""}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Button
                      className="auth-form-buttons"
                      color="teal"
                      onClick={() => authenticateUser(signupEmail, signupPassword, false)}
                    >
                      Sign up
                    </Button>
                  </Form>
                  <div className="google-login"></div>
                </Fragment>
              )}
            </Fragment>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}

//export default AuthForm;
export default withRouter(AuthForm);
