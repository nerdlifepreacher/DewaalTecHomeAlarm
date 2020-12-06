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
    CardText,

} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { clearErrors } from '../actions/errorActions'
import { deleteDevices, registerDevice, fetchDevices } from '../actions/deviceActions'
import { fetchEndpoints, deleteEndpoint, registerEndpoint } from '../actions/endpointActions'
const { detect } = require('detect-browser');
const browser = detect();


const publicVapidKey="BDbBRpqdGBywczNL_6OFC5J_AJXqCiMXUEXUNBr2i6iYLaaxcmpPgjRX6RdOXjctwGKfnxeEUds-qsS1dn7J48o"

class Manage extends React.Component {
      constructor(props) {
    super(props);
    
    }
    componentDidMount() {
        const userID = this.props.auth.user.id
        console.log(this.props)
        this.props.dispatch(fetchDevices(userID))
        this.props.dispatch(fetchEndpoints(userID))
    }
    state = {
        msg: null,
        deviceID: '',
        deviceName: '',
        short_name: browser.name
    }
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        // clearErrors: PropTypes.func.isRequired,
        // register: PropTypes.func.isRequired,
        // auth: PropTypes.object.isRequired,
        // registerDevice: PropTypes.func.isRequired,
        // fetchDevices: PropTypes.func.isRequired,
        // fetchEndpoints: PropTypes.func.isRequired
    }
    
    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    async submitDevice() {
        const { deviceID, deviceName } = this.state
        const newDevice = {
            deviceID,
            deviceName,
            userID:this.props.auth.user.id
        }
        this.props.dispatch(registerDevice(newDevice))
    }
    async submitEndpoint() {
        const userID = this.props.auth.user.id
        const register = await navigator.serviceWorker.register("./sw.js", {
            scope: "/"
        })
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicVapidKey,
            })
        const newEndpoint = {
            userID:this.props.auth.user.id,
            shortName: this.state.short_name,
            endpoint: subscription
        }
       this.props.dispatch(registerEndpoint(newEndpoint))
 
    }   
    async handleDeviceDeleteClick (deviceID) {
        const userID = this.props.auth.user.id
        console.log("handleDeviceDeleteClick " + deviceID)
        this.props.dispatch(deleteDevices(deviceID, userID))

    }
    handleEndpointDeleteClick(endpointID) {
        console.log(this.props.endpoints.endpoints[0]._id)
        const userID = this.props.auth.user.id
        this.props.dispatch(deleteEndpoint(endpointID))

    }
    render() {  
        const deviceList = []
        for (let i = 0; i < this.props.devices.devices.length; i++) {
            deviceList.push(
                <li key={i} style={{ listStyleType: "none" }}>
                <span className="mr-3" >
                    <i className="fas fa-minus-circle" onClick={() => this.handleDeviceDeleteClick(this.props.devices.devices[i]._id)}></i>
                </span>
                <span  style={{fontSize:"large"}}>
                    {this.props.devices.devices[i].deviceName}
            </span>
                </li>
            )
        }
        const endpointist = []

        for (let i = 0; i < this.props.endpoints.endpoints.length; i++) {
            endpointist.push(
                <li key={i} style={{ listStyleType: "none" }}>
                    <span className="mr-3" >
                        <i className="fas fa-minus-circle" onClick={() => this.handleEndpointDeleteClick(this.props.endpoints.endpoints[i]._id)}></i>
                    </span>
                    <span  style={{fontSize:"large"}}>
                        {this.props.endpoints.endpoints[i].shortName}
                    </span>
                </li>
            )
        }        
        const cardStyles = {
            top: "35%",
            margin: "0 auto",
            width: "100%",

        }
        const innerShadow = {
            WebkitBoxShadow: "inset 0 0 40px #000000",
            MozBoxShadow: "inset 0 0 40px #000000",
            boxShadow: "inset 0 0 40px #000000"
        }
        return (
            <div style={cardStyles}>
            <Container>               
                <Row xs="2">
                <Col >
                <Card className="mb-3" style={innerShadow}> 
                    <CardBody>
                        <CardTitle cssModule={{'modal-title': 'w-100 text-center'}}>
                            <h2>Register Alarm</h2>
                             <CardSubtitle tag="h6" className="mb-4 text-muted">Add an alarm </CardSubtitle>
                        </CardTitle>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form>
                            <FormGroup>
                                <Label for="device_id">Device ID</Label>
                                <Input
                                    type="deviceID"
                                    name="deviceID"
                                    id="deviceID"
                                    placeholder="deviceID"
                                    className="mb-3"
                                    onChange={this.handleOnChange}
                                            />
                                <Label for="device_name">Device Name </Label>
                                <Input
                                    type="deviceName"
                                    name="deviceName"
                                    id="deviceName"
                                    placeholder="Garage"
                                    className="deviceName"
                                    onChange={this.handleOnChange}
                                />
                                <Button color="dark" style={{ marginTop: '2rem' }} onClick={() =>this.submitDevice()}>
                                    Submit
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    </Card>
                    </Col>
                    <Col>
                        <Card className="mb-3" style={innerShadow}> 
                        <CardBody>
                            <CardTitle cssModule={{'modal-title': 'w-100 text-center'}}>
                                <h3>Devices</h3>
                                        <CardText>
                                            {deviceList}
                                        </CardText>
                            </CardTitle>
                        </CardBody>
                            </Card>
                    </Col>
                    </Row>
                    <Row xs="2"> 
                    <Col>
                    <Card className="mb-3" style={innerShadow}> 
                        <CardBody>
                            <CardTitle cssModule={{'modal-title': 'w-100 text-center'}}>
                                <h2>Register this Endpoint</h2>
                                <CardSubtitle tag="h6" className="mb-4 text-muted">Add this browse to the list of enpoints re</CardSubtitle>
                            </CardTitle>
                        <Form onSubmit={this.submitEndpoint}>
                                <FormGroup>
                                    <Label for="short_name">Name this Endpoint</Label>
                                    <Input
                                        type="short_name"
                                        name="short_name"
                                        id="short_name"
                                        placeholder={browser.name}
                                        className="mb-3"
                                        onChange={this.handleOnChange}
                                    />
                                    <Button color="dark" style={{ marginTop: '2rem' }} onClick={() =>this.submitEndpoint()}> 
                                        Register
                                    </Button>
                                </FormGroup>
                            </Form>
                    </CardBody>
                    </Card>
                    </Col>
                    <Col>                    
                    <Card className="mb-3" style={innerShadow}> 
                            <CardBody>
                            <CardTitle cssModule={{'modal-title': 'w-100 text-center'}}>
                                <h3>Endpoints</h3>
                                <CardText>
                                    {endpointist}
                                </CardText>
                            </CardTitle>                        
                            </CardBody>
                        </Card>
            </Col>
            </Row>
             <Row xs="1">
                <Col>
                <Card className="mb-3" style={innerShadow}> 
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
    error: state.error,
    auth: state.auth,
    devices: state.devices,
    endpoints: state.endpoints
    
})
// { fetchEndpoints, registerDevice, register, clearErrors, fetchDevices, deleteDevices, deleteEndpoint}
const mapDispatchToProps = dispatch => ({
   dispatch                // ← Add this
})
export default connect(
    mapStateToProps,mapDispatchToProps
    
)(Manage)