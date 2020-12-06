import { combineReducers } from 'redux'
import error from './errorRuducer'
import auth from './authReducer'
import devices from './deviceReducer'
import endpoints from './endpointReducer'


export default combineReducers({
    error,
    auth,
    devices,
    endpoints
})
