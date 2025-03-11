import { combineReducers } from "redux";
import userReducer from "./userSlice"; // Example slice

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
