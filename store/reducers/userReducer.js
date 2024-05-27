import { createSlice } from '@reduxjs/toolkit';

// Kiểm tra nếu đang chạy trên client-side để sử dụng localStorage
let storedUserInfo = null;

if (typeof window !== 'undefined') {
  storedUserInfo = localStorage.getItem("USER_INFO");
}

const initialState = {
  user: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInf: (state, action) => {
      state.user = action.payload;
    },
  }
});

export const { setInf } = userSlice.actions;
export default userSlice.reducer;
