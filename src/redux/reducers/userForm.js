import {
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_AGE,
  UPDATE_SEX,
  UPDATE_PASSWORD,
  UPDATE_REPEAT,
  FETCH_ONE_USER,
  RESET_USER_FORM,
} from "../actionTypes";

const initState = {
  firstName: null,
  lastName: null,
  age: null,
  sex: "Female",
  password: null,
  repeat: null,
};

function userForm(state = initState, action) {
  const { type, value, data } = action;
  switch (type) {
    case UPDATE_FIRST_NAME:
      return {
        ...state,
        firstName: value,
      };
    case UPDATE_LAST_NAME:
      return {
        ...state,
        lastName: value,
      };
    case UPDATE_AGE:
      let v = value;
      if (v === "") {
      } else {
        v = parseInt(value);
      }
      return {
        ...state,
        age: v,
      };
    case UPDATE_SEX:
      return {
        ...state,
        sex: value,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: value,
      };
    case UPDATE_REPEAT:
      return {
        ...state,
        repeat: value,
      };
    case FETCH_ONE_USER:
      return {
        ...data,
      };
    case RESET_USER_FORM:
      return {
        ...initState,
      };
    default:
      return state;
  }
}

export default userForm;
