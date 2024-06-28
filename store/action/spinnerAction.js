import { HIDE_SPINNER, SHOW_SPINNER } from "../constants/spinner";

// Action creators cho spinner
export const showSpinner = () => ({
    type: SHOW_SPINNER,
  });
  
  export const hideSpinner = () => ({
    type: HIDE_SPINNER,
  });