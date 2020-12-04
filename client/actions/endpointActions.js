const axios = require('Axios')
import { returnErrors } from './errorActions'

import {
    ENDPOINT_SUCCESS,
    ENDPOINT_FAIL
} from "./typesAction"
const enpontURL = 'http://localhost:3000/api/endpoints/'
export const register = ({ email, endpoint, shortName }) => dispatch => {
    const body = JSON.stringify({ email, endpoint, shortName })
    console.log(shortName)
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
    console.log(enpontURL, body, options)
    axios.post(enpontURL, body, options)
        .then(res => dispatch({
            type: ENDPOINT_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: ENDPOINT_FAIL
            })
        })

}