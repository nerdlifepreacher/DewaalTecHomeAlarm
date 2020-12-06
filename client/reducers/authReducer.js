import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RELOGIN_SUCCESS
} from "../actions/typesAction"
import { isAuthenticated, getUserTokenInfo} from '../utils/auth'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: isAuthenticated(),
    isLoading: false,
    user: JSON.parse(localStorage.getItem('user')),
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            const userObject = {
                id: action.payload.user.id,
                email: action.payload.user.email,
                name: action.payload.user.name
            }
            const user = JSON.stringify(userObject)
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', user)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL: 
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading:false
            }
        default:
            return state
    }
}