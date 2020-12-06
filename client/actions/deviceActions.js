const axios = require('Axios')
import { returnErrors } from './errorActions'
// import {FETCH_SUCCESS} from './typesAction'
// import FETCH_FAIL from './typesAction'

import {
    DEVICE_SUCCESS,
    DEVICE_FAIL,
    DEVICE_FETCH_SUCCESS,
    DEVICE_DELETE_SUCCESS
} from "./typesAction"
const deviceURL = 'http://localhost:3000/api/devices/'
export const registerDevice = ({ deviceID, deviceName, userID }) => dispatch => {
    const body = JSON.stringify({ deviceID, deviceName, userID })
    const options = {
        headers: {
            'METHOD': "POST",
            'Content-Type': 'application/json'
        },
    }
    const token = localStorage.getItem('token')
    if (token) {
        options.headers['x-auth-token'] = token
    }
    axios.post(deviceURL, body, options)
        .then(res => dispatch({
            type: DEVICE_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'DEVICE_FAIL'))
            dispatch({
                type: DEVICE_FAIL
            })
        })
}
export const fetchDevices = ( userID ) => dispatch => {
    const getDeviceUrl = (deviceURL + userID)
    console.log("hit")
    axios
        .get(getDeviceUrl)
        .then(res => {
            let payload = res.data.filter(devices => devices = userID)
            return { payload }
            }
        )
        .then(res => {
            dispatch({
                type: DEVICE_FETCH_SUCCESS,
                payload: res.payload   
            })
        })
        .catch(err => {
            console.log(err)
            })
}
// export const deleteDevices = ( deviceID, userID ) => dispatch => {
//     const getDeviceUrl = (deviceURL + deviceID)
//     console.log("deleteDevices hit "+getDeviceUrl)
//     axios
//         .delete(getDeviceUrl)
//         .then(next => {
//             return fetchDevices(userID)
            
//             }
//         )
//         .catch(err => {
//             console.log(err)
//             })
// }
export const deleteDevices = ( deviceID ) => dispatch => {
    const getDeviceUrl = (deviceURL + deviceID)
    console.log("deleteDevices hit "+getDeviceUrl)
    axios
        .delete(getDeviceUrl)
        .then( next =>
            dispatch({
                type: DEVICE_DELETE_SUCCESS,
                payload: deviceID
            })
        )
        .catch(err => {
            console.log(err)
            })
}