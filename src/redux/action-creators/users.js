import axios from "axios";
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  REMOVE_USERS_FROM_LIST,
  SEARCH_USERS,
  RESET_USER_FORM,
  UPDATE_USER_SUCCESS,
} from "../actionTypes";

const fetchUsersStart = () => ({
  type: FETCH_USERS_START,
});

const fetchUsersSuccess = (data) => ({
  type: FETCH_USERS_SUCCESS,
  data,
});

const fetchUsersError = (error) => ({
  type: FETCH_USERS_ERROR,
  error,
});

const removeUserFromList = (userId) => ({
  type: REMOVE_USERS_FROM_LIST,
  userId,
});

const searchUserResult = (data) => ({
  type: SEARCH_USERS,
  data,
});

export const sortUsers = (type, order) => ({
  type,
  order,
});

export const resetUserForm = () => ({
  type: RESET_USER_FORM,
});

const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});

export const deleteUserAction = (userId) => {
  return (dispatch) => {
    axios.delete(`http://localhost:5000/users/${userId}`).then((res) => {
      dispatch(removeUserFromList(userId));
    });
  };
};

export const searchUsersAction = (search) => {
  return (dispatch) => {
    axios.post("http://localhost:5000/users/search", { search }).then((res) => {
      dispatch(searchUserResult(res.data));
    });
  };
};

export const createUserAction = (user, history) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/users", user)
      .then((res) => {
        dispatch(fetchUsers());
        history.push("/");
      })
      .then(() => dispatch(resetUserForm()));
  };
};

export const updateUserAction = (id, user, history) => {
  return (dispatch) => {
    axios
      .patch(`http://localhost:5000/users/${id}`, user)
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersStart());
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchUsersError(err));
      });
  };
};
