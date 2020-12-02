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
} from 'reactstrap';
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux';
class AppNavbar extends React.Component {
    render() {
        const navBarStyle = {
	    '-webkit-box-shadow': '0 0 10px black',
	    '-moz-box-shadow': '0 0 0 10px black',
        'box-shadow': '0 0 10px black',
        'opacity': '0.8'
        }
        return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-3" style={navBarStyle}>
                    <Image src="./favicon.png" style={{ width: "2em", height:"2em" }} className="ml-2 mr-4 "  fluid/>
                    <NavbarBrand className="mr-auto mt-2" href="/" > <h2 style={{'font-family': 'Rationale'}}>DeWaalTec </h2></NavbarBrand>
                    <Container>  
                    </Container>
                    <Nav className="mr-auto" tabs>
                
                        
                          
                        <NavItem className="list-unstyled">
                            <NavLink href="/" active >Management Console</NavLink>
                        </NavItem>
                        <NavItem className="list-unstyled">
                            <NavLink href="/components/">Alert Logs</NavLink>
                        </NavItem>
                        
                           </Nav>
                         <NavItem className="list-unstyled ml-3"><i className="fas fa-sign-out-alt fa-2x"></i></NavItem>
                        
                </Navbar>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(AppNavbar);