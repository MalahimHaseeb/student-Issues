// userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { toast } from 'react-hot-toast';

interface UserState {
  token: string | null;
  email: string | null;
}

const initialState: UserState = {
  token: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; email: string }>) {
      const { token, email } = action.payload;
      state.token = token;
      state.email = email;
    },
    logout(state) {
      state.token = null;
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// Define async action creator for logout with side effects like displaying a toast message and redirecting the user.
export const logoutUser = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    // Remove the token from local storage
    localStorage.removeItem('myuser');
  
    // Dispatch the logout action
    dispatch(logout());
  
    // Display a success message
    toast.success('Successfully logged out');
  };
export default userSlice.reducer;
