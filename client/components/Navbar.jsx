import React, { Fragment, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavLink,
    NavItem,
  Nav,
    Container,
} from 'reactstrap'
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import PropTypes from 'prop-types'

class AppNavbar extends React.Component {
static propTypes = {
        logout: PropTypes.func.isRequired
    }
    render() {
      const navBarStyle = {
	      'WebkitBoxShadow': '0 0 10px black',
	      'MozBoxShadow': '0 0 0 10px black',
        'boxShadow': '0 0 10px black',
        'opacity': '0.8'
      }
      
      return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-3" style={navBarStyle}>
                    <Image src="./favicon.png" style={{ width: "2em", height:"2em" }} className="ml-2 mr-4 "  fluid/>
                    <NavbarBrand className="mr-auto mt-2" href="/" > <h2 style={{'fontFamily': 'Rationale'}}>DeWaalTec </h2></NavbarBrand>
                    <Container>  
                    </Container>
                    <Nav className="mr-auto" tabs>
                    <NavItem className="list-unstyled">
                            <NavLink href="/" active >Management Console</NavLink>
                        </NavItem>
                        <NavItem className="list-unstyled">
                            <NavLink href="/components/">Alert Logs</NavLink>
                        </NavItem>
                                                <NavItem className="list-unstyled">
                            <NavLink href="/components/">Device Info</NavLink>
                        </NavItem>
                        
                           </Nav>
                         <NavItem className="list-unstyled ml-3" onClick={()=>{this.props.logout()}}><i className="fas fa-sign-out-alt fa-2x"></i></NavItem>
                        
                </Navbar>
            </div>
        )
    }
}
const mapStateToProps = (auth) => ({
  auth
});
export default connect(mapStateToProps, { logout })(AppNavbar);