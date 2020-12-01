import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import PropTypes from 'prop-types'
import {clearErrors} from '../../actions/errorActions'

class LoginModal extends React.Component {
    state = {
        modal: true,
        email: '',
        password: '',
        msg: null
    }
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props
        if (error !== prevProps.error ) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg})
            } else {
                this.setState({msg: null})
            }
        }
        if (this.state.modal) {
            if (isAuthenticated) {
                this.handleToggle()
            }
        }
    }
    handleToggle = () => {
        this.props.clearErrors
        this.setState({
            modal: !this.state.modal
        })
    }

    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOnSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state
        const user = {
            email,
            password
        }
        this.props.login(user)
    }
    
    render() {
    const modal = this.state.modal
    const modalStyles = {
        top: "35%",
        margin: "0 auto"
        }
 
        return (
        <div>
                <Modal isOpen={modal} toggle={this.handleToggle} fade={true} style={modalStyles} backdrop={'static'} keyboard={false}>
                <ModalHeader toggle={this.handleToggle} cssModule={{'modal-title': 'w-100 text-center'}}>Login</ModalHeader>
                <ModalBody>
                    {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                    <Form onSubmit={this.handleOnSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email"
                                className="mb-3"
                                onChange={this.handleOnChange}
                            />
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                placeholder="email"
                                onChange={this.handleOnChange}
                            />
                            <Button color="dark" style={{ marginTop: '2rem' }} block>
                                Login
                            </Button>
                        </FormGroup>
                        </Form>
                        <div  style={{ marginTop: '2rem' }}> 
                            <Link to="/register">
                           
                                <p className="text-center">Register?</p>
                           
                            </Link>
                        </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(
    mapStateToProps,
    { login, clearErrors }
)(LoginModal)