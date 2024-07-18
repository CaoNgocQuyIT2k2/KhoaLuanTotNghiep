import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import { spinnerReducer } from './reducers/spinnerReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    spinner: spinnerReducer,
    // Thêm các reducer khác ở đây nếu có
  },
});

export default store;
