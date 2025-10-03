import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addUser: (state, action) => {
      state.list.unshift(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.list.findIndex(user => user.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
  },
});

export const { setUsers, setError, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
