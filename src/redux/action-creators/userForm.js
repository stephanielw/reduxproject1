import axios from "axios";
import { FETCH_ONE_USER } from "../actionTypes";
export const updateUserForm = (type, value) => ({
  type,
  value,
});

const fetchOneUserResult = (data) => ({
  type: FETCH_ONE_USER,
  data,
});

export const fetchOneUserAction = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:5000/users/${id}`).then((res) => {
      console.log("fetch:" + res.data);
      dispatch(fetchOneUserResult(res.data));
    });
  };
};
