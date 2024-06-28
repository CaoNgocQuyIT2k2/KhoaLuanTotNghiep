import { HIDE_SPINNER, SHOW_SPINNER } from "../constants/spinner";

let initialState = {
    isLoading: false,
}

export let spinnerReducer = (state = initialState,action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return {...state, isLoading: true};
        case HIDE_SPINNER:
            return {...state, isLoading: false};
        default:
            return state;
    }
}