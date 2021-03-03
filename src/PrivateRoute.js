import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useContext } from "react";
import firebase from "firebase";
import { AuthContext } from './Auth'

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  //const {currentUser} = useContext(AuthContext);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to={"/login"} />
          )
        }
    />
  )
}