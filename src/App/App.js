import React, { Component } from "react";
import logo from '../logo.svg';
import './App.css';
import Home from '../Home/Home.js';
import AuthForm from '../AuthForm/AuthForm.js';
import Addasset from '../Addasset/Addasset.js';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from '../PrivateRoute';
import firebase from "firebase";
import { AuthProvider } from '../Auth';


export default class App extends Component {
  render() {
	return (
	<AuthProvider>
	  <div className="App">
	  	<BrowserRouter>
	  		<PrivateRoute exact path="/" component={Home} />
	  		<Route path="/login" component={AuthForm} />
        <Route path="/addasset" component={Addasset}/>
	  	</BrowserRouter>
	  </div>
	</AuthProvider>
	);
  }
}
