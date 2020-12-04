import React from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import AppNavbar from './Navbar'
import RegisterNodal from './auth/RegisterModal'
import Main from './Main'

  export function App({ auth }) {

  // render() {
    return (    
      <Router>
        <AppNavbar />
        <Route exact path="/" component={Main} />
        <Route path="/register" component={RegisterNodal} />
      </Router>
    )
  }

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}


export default connect(mapStateToProps)(App);
