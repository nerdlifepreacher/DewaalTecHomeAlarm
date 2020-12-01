import React from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import AppNavbar from './Navbar'
import {loadUser} from '../actions/authActions'
import LoginModal from './auth/loginModal'
import RegisterNodal from './auth/RegisterModal'
import Subscribe from './Subscribe'
  // componentDidMount() {
  //  store.dispatch(loadUser)
  // }


class App extends React.Component {

  render() {
    return (    
      <Router>
      <AppNavbar />
        <Route exact path="/" component={LoginModal} />
        <Route path="/register" component={RegisterNodal} />
      </Router>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(App);
