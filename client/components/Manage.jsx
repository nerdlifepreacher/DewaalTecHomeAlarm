import "regenerator-runtime/runtime"
import React, { useState } from 'react'
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Container,
    Row,
    Col,

} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { clearErrors } from '../actions/errorActions'
const { detect } = require('detect-browser');
const browser = detect();

// const dotenv = require('dotenv');
// const publicVapidKey = dotenv.process.env.PUBLICVAPIDKEY

const publicVapidKey="BDbBRpqdGBywczNL_6OFC5J_AJXqCiMXUEXUNBr2i6iYLaaxcmpPgjRX6RdOXjctwGKfnxeEUds-qsS1dn7J48o"

class Manage extends React.Component {
    state = {
        name: '',
        email: '',
        msg: null
    }
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
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

        // this.props.register(newUser)
    }

    async send() {
    // Register Service Worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("./sw.js", {
        scope: "/"
    })
    const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
        applicationServerKey: publicVapidKey,
        
    })
}

    render() {       
        const cardStyles = {
        top: "35%",
        margin: "0 auto",
        width: "100%"
        }
        return (
            // add devices_list to the right, 
            // add logs to the righ5
            // add votage graph 
            <div style={cardStyles}>
            <Container>               
                <Row xs="2">
                <Col >
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle cssModule={{'modal-title': 'w-100 text-center'}}>
                            <h2>Register Alarm</h2>
                             <CardSubtitle tag="h6" className="mb-4 text-muted">Add an alarm </CardSubtitle>
                        </CardTitle>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.handleOnSubmit}>
                            <FormGroup>
                                <Label for="device_id">Device ID</Label>
                                <Input
                                    type="device_id"
                                    name="device_id"
                                    id="device_id"
                                    placeholder="device_id"
                                    className="mb-3"
                                    onChange={this.handleOnChange}
                                            />
                                <Label for="device_name">Device Name </Label>
                                <Input
                                    type="device_name"
                                    name="device_name"
                                    id="device_name"
                                    placeholder="garage"
                                    className="device_name"
                                    onChange={this.handleOnChange}
                                />
                                <Button color="dark" style={{ marginTop: '2rem' }}>
                                    Submit
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    </Card>
                    </Col>
                    <Col>
                        <Card>
                        <CardBody>
                            <CardTitle cssModule={{'modal-title': 'w-100 text-center'}}>
                                <h3>Devices</h3>
                                 <CardSubtitle tag="h6" className="mb-4 text-muted">Add an alarm </CardSubtitle>
                            </CardTitle>
                        </CardBody>
                            </Card>
                    </Col>
                    </Row>
                    <Row xs="2"> 
                    <Col>
                    <Card className="mb-3">
                        <CardBody>
                            <CardTitle cssModule={{'modal-title': 'w-100 text-center'}}>
                                <h2>Register this Endpoint</h2>
                                <CardSubtitle tag="h6" className="mb-4 text-muted">Add this browse to the list of enpoints re</CardSubtitle>
                            </CardTitle>
                        <Form onSubmit={this.handleOnSubmit}>
                                <FormGroup>
                                    <Label for="register">Name this Endpoint</Label>
                                    <Input
                                        type="register"
                                        name="register"
                                        id="register"
                                        defaultValue={browser.name+" "+browser.os}
                                        className="mb-3"
                                        onChange={this.handleOnChange}
                                    />
                                    <Button color="dark" style={{ marginTop: '2rem' }} onClick={() =>this.send()}> 
                                        Register
                                    </Button>
                                </FormGroup>
                            </Form>
                    </CardBody>
                    </Card>
                    </Col>
                    <Col>                    
                    <Card className="mb-3">
                            <CardBody>
                            <CardTitle cssModule={{'modal-title': 'w-100 text-center'}}>
                                <h3>Endpoints</h3>
                                 <CardSubtitle tag="h6" className="mb-4 text-muted">Add an alarm </CardSubtitle>
                            </CardTitle>                        
                            </CardBody>
                        </Card>
            </Col>
            </Row>
             <Row xs="1">
                <Col>
                <Card>
                <CardBody>
                    <CardTitle cssModule={{'modal-title': 'w-100 text-center'}}>
                        <h2>Logs</h2>
                            <CardSubtitle tag="h6" className="mb-4 text-muted">Last 5 events</CardSubtitle>
                    </CardTitle>                        
                    </CardBody>
                </Card>        
                </Col>
            </Row>        
            </Container>
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
    { clearErrors }
)(Manage)