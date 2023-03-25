import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../component/pages/Home/counterSlice";

const rootReducer = {
  counter: counterReducer,
};

export default combineReducers(rootReducer);