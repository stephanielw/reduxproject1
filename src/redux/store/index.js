import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
//import logger from "redux-logger";

import users from "../reducers/users";
import userForm from "../reducers/userForm";

const allReducer = combineReducers({
  users,
  userForm,
});

const store = createStore(allReducer, applyMiddleware(thunk));

export default store;
