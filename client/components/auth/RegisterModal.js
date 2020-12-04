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
    Alert,
} from 'reactstrap'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { register } from '../../actions/authActions'
import PropTypes from 'prop-types'
import {clearErrors} from '../../actions/errorActions'

class RegisterModal extends React.Component {
    state = {
        modal: true,
        name: '',
        email: '',
        password: '',
        msg: null
    }
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
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
        const { name, email, password } = this.state
        const newUser = {
            name,
            email,
            password
        }

        this.props.register(newUser)
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
                    <ModalHeader toggle={this.handleToggle} cssModule={{'modal-title': 'w-100 text-center'}}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.handleOnSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    className="mb-3"
                                    onChange={this.handleOnChange}
                                />
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
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>                                                        <div>
                                <Link to="/">     
                                    <p className="text-center" style={{fontSize: 'smaller'}}>Login</p>
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
    error: state.error,
    
})
export default connect(
    mapStateToProps,
    { register, clearErrors }
)(RegisterModal)




{/* <NavLink onClick={this.toggle} href="">
    Register
</NavLink> */}