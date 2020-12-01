import React, { Component, Fragment } from "react";
import { propTypes } from "prop-types"
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { logout } from '../../actions/authActions'

export class Logout extends Component {
    static = propTypes = {
        logout:  propTypes.func.isRequired
    }
    render() { 
        return ( 
        <Fragment>
            <NavLink onClick={this.props.logout}href="">        
            logout    
            </NavLink>
                
        </Fragment>
         );
    }
}
 
export default connect(null, { logout}) (logout)