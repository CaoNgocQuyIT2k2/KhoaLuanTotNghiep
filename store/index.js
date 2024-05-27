import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    // Thêm các reducer khác ở đây nếu có
  },
});

export default store;
