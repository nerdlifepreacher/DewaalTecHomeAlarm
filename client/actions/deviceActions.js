const axios = require('Axios')
import { returnErrors } from './errorActions'

import {
    DEVICE_SUCCESS,
    DEVICE_FAIL
} from "./typesAction"
const deviceURL = 'http://localhost:3000/api/devices/'
export const registerDevice = ({ deviceID, deviceName, userID }) => dispatch => {
    const body = JSON.stringify({ deviceID, deviceName, userID })
    const options = {
        headers: {
            'METHOD' : "POST",
            'Content-Type': 'application/json'
        },
    }
    const token = localStorage.getItem('token')
    if(token) {
        options.headers['x-auth-token'] = token
    }
    console.log(deviceURL, body, options)
    axios.post(deviceURL, body, options)
        .then(res => dispatch({
            type: DEVICE_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: DEVICE_FAIL
            })
        })

}