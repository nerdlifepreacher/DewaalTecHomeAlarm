const axios = require('Axios')
import { returnErrors } from './errorActions'
import {
    ENDPOINT_SUCCESS,
    ENDPOINT_FAIL,
    ENDPOINT_FETCH_SUCCESS,
    ENDPOINT_DELETE_SUCCESS
} from "./typesAction"
const enpontURL = 'http://localhost:3000/api/endpoints/'
export const registerEndpoint = ({ userID, endpoint, shortName }) => dispatch => {
    const body = JSON.stringify({ userID, endpoint, shortName })
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
export const fetchEndpoints = ( userID ) => dispatch => {
    // const body = JSON.stringify({userID})
    const getEndpointUrl = (enpontURL+"5fc8b75b5de131137cae6090")
    axios
        .get(getEndpointUrl)
        .then(res =>
            dispatch({
            type: ENDPOINT_FETCH_SUCCESS,
            payload: res.data
            })
        )
        .catch(err => {
            console.log(err)
            })
}
export const deleteEndpoint = ( endpointID ) => dispatch => {
    const deleteEndpointUrl = (enpontURL + endpointID)
    axios
        .delete(deleteEndpointUrl)
        .then( next =>
            dispatch({
                type: ENDPOINT_DELETE_SUCCESS,
                payload: endpointID
            })
        )
        .catch(err => {
            console.log(err)
            })
}