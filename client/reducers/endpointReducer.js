import {
    ENDPOINT_FETCH_SUCCESS,
    ENDPOINT_DELETE_SUCCESS,
    ENDPOINT_SUCCESS
} from "../actions/typesAction"

const initialState = {
    endpoints: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ENDPOINT_FETCH_SUCCESS: {
            return {
                ...state,
                endpoints: action.payload
            }
        }
        case ENDPOINT_DELETE_SUCCESS: {
            return {
                ...state,
                endpoints: state.endpoints.filter(endpoints => endpoints._id != action.payload)
            }
        }
        case ENDPOINT_SUCCESS: {
            return {
                ...state,
                endpoints: [ action.payload, ...state.endpoints]
            }
        }
        default:
        return state
    }
}

        