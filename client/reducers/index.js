import { combineReducers } from 'redux'
import error from './errorRuducer'
import auth from './authReducer'


export default combineReducers({
    error,
    auth
})
