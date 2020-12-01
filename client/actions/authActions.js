const fetch = require('node-fetch');
const axios = require('Axios')
import { returnErrors } from './errorActions'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./typesAction"
const userURL = 'http://localhost:3000/api/users/register'
const authURL = 'http://localhost:3000/api/auth/'

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const loadUser = (dispatch, getState) => {
    dispatch({ type: USER_LOADING })
    fetch(userURL, tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload:res.data
        })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                type:AUTH_ERROR
            })
        })
        )
    
}
export const login = ({ email, password }) => dispatch => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    axios.post(authURL, body, options)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response.data)
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}
export const register = ({ name, email, password }) => dispatch => {
    const body = JSON.stringify({ name, email, password })
    console.log(body)
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    console.log(options)
    axios.post(userURL, body, options)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })

}
export const tokenConfig = getState => {
    const token = getState().auth.token
        options = {
        method: 'GET',
        body: substring,
        headers: {
            "content-type": "application/json"
        }
    }
     if(token) {
        options.headers['x-auth-token'] = token
    }
    return options
}