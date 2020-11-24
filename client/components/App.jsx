import React from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Login from './Login'


export function App({ auth }) {
  return (
   
    <Router>
      <Route exact path="/" component={Login} />
    </Router>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(App);
