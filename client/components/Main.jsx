import React from 'react'
import { connect } from 'react-redux'
import LoginModal from './auth/loginModal'
import Manage from './Manage'

class Main  extends React.Component {

  render() {
  return (
        <div>
            {!this.props.auth.isAuthenticated && <LoginModal />}
            {this.props.auth.isAuthenticated &&  <Manage />}
        </div>
    )
}
}
const mapStateToProps = ({ auth }) => {
    return {
      auth
    }
  }
export default connect(mapStateToProps)(Main)