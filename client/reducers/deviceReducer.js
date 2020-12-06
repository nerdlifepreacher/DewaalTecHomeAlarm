import {
    FETCH_DEVICE,
    DEVICE_FETCH_SUCCESS,
    DEVICE_DELETE_SUCCESS,
    DEVICE_SUCCESS
} from "../actions/typesAction"

const initialState = {
    devices: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_DEVICE: {
            return {
                ...state,
                devices: action.payload
            }
        }
        case DEVICE_FETCH_SUCCESS: {
            return {
                ...state,
                devices: action.payload
            }
        }
        case DEVICE_DELETE_SUCCESS: {
            return {
                ...state,
                devices: state.devices.filter(devices => devices._id != action.payload)
            }
        }
        case DEVICE_SUCCESS: {
            return {
                ...state,
                devices: [ action.payload, ...state.devices]
            }
        }
        default:
        return state
    }
}