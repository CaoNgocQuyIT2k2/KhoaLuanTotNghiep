import { HIDE_SPINNER, SET_USER_INFO, SHOW_SPINNER, UPDATE_USER_AVATAR, UPDATE_USER_INFO } from '../constants/user';
export const updateUserAvatar = (avatarUrl) => ({
  type: UPDATE_USER_AVATAR,
  payload: avatarUrl,
});
export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});

export const updateUserInfo = (userInfo) => ({
  type: UPDATE_USER_INFO,
  payload: userInfo,
});

