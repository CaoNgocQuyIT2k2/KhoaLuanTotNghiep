import { SET_USER_INFO, UPDATE_USER_AVATAR, UPDATE_USER_INFO, UPDATE_USER_TOKEN } from '../constants/user';

// Define a function to retrieve user info from localStorage, if available
const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const userInfo = JSON.parse(localStorage.getItem("USER_INFO")) || {};
    return userInfo.user || null;
  }
  return null;
};

// Define a function to retrieve token from localStorage, if available
const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const userInfo = JSON.parse(localStorage.getItem("USER_INFO")) || {};
    return userInfo.token || null;
  }
  return null;
};

const initialState = {
  user: getUserFromLocalStorage(), // Call the function to get user info
  token: getTokenFromLocalStorage(), // Call the function to get token
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
            return {
                ...state,
                user: action.payload,
            };
    case UPDATE_USER_AVATAR:
      const updatedUserAvatar = {
        ...state.user,
        avatar: action.payload,
      };
      if (typeof window !== 'undefined') {
        const userInfo = JSON.parse(localStorage.getItem("USER_INFO")) || {};
        localStorage.setItem("USER_INFO", JSON.stringify({ ...userInfo, user: updatedUserAvatar }));
      }
      return {
        ...state,
        user: updatedUserAvatar,
      };
    case UPDATE_USER_INFO:
      const updatedUserInfo = action.payload;
      if (typeof window !== 'undefined') {
        const userInfo = JSON.parse(localStorage.getItem("USER_INFO")) || {};
        localStorage.setItem("USER_INFO", JSON.stringify({ ...userInfo, user: updatedUserInfo }));
      }
      return {
        ...state,
        user: updatedUserInfo,
      };
    case UPDATE_USER_TOKEN:
      const updatedToken = action.payload;
      if (typeof window !== 'undefined') {
        const userInfo = JSON.parse(localStorage.getItem("USER_INFO")) || {};
        localStorage.setItem("USER_INFO", JSON.stringify({ ...userInfo, token: updatedToken }));
      }
      return {
        ...state,
        token: updatedToken,
      };
    default:
      return state;
  }
};

export default userReducer;
