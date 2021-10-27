import axios from "axios";
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  REMOVE_USER_START,
  REMOVE_USER_SUCCESS,
  RESET_USER_FORM,
  UPDATE_USER_SUCCESS,
  UPDATE_PAGE_CONTENT,
  SEARCH_USERS_START,
  SEARCH_USERS_SUCCESS,
  CREATE_USER_SUCCESS,
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

const removeUserStart = () => ({
  type: REMOVE_USER_START,
});

const removeUserSuccess = (userId) => ({
  type: REMOVE_USER_SUCCESS,
  userId,
});

export const sortUsers = (type, order) => ({
  type,
  order,
});

export const resetUserForm = () => ({
  type: RESET_USER_FORM,
});

const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  data,
});

const searchUsersStart = (search) => ({
  type: SEARCH_USERS_START,
  search,
});

const searchUsersSuccess = (data) => ({
  type: SEARCH_USERS_SUCCESS,
  data,
});

const createUserSuccess = (data) => ({
  type: CREATE_USER_SUCCESS,
  data,
});

export const updatePageContentAction = (currentPage) => ({
  type: UPDATE_PAGE_CONTENT,
  currentPage,
});

export const deleteUserAction = (userId) => {
  return (dispatch) => {
    dispatch(removeUserStart());
    axios.delete(`http://localhost:5000/users/${userId}`).then((res) => {
      dispatch(removeUserSuccess(userId));
    });
  };
};

export const searchUsersAction = (search) => {
  return (dispatch) => {
    dispatch(searchUsersStart(search));
    axios.post("http://localhost:5000/users/search", { search }).then((res) => {
      dispatch(searchUsersSuccess(res.data));
    });
  };
};

export const createUserAction = (user, history) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/users", user)
      .then((res) => {
        dispatch(createUserSuccess(res.data));
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
        dispatch(updateUserSuccess(res.data));
        history.push("/");
      })
      .then(() => dispatch(resetUserForm()))
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
