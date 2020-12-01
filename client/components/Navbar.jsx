import React, { Fragment, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
class AppNavbar extends React.Component {
    render() {
        return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">DeWaalTec Home Alarm</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        derp
                        </Nav>
                </Container>
            </Navbar>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(AppNavbar);