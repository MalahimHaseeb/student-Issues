// rootReducer.ts

import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type based on the rootReducer

export default rootReducer;
