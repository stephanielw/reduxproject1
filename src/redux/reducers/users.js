import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  REMOVE_USERS_FROM_LIST,
  SEARCH_USERS,
  FETCH_ONE_USER,
  SORT_FIRST_NAME,
  SORT_LAST_NAME,
  SORT_AGE,
  SORT_SEX,
  UPDATE_USER_SUCCESS,
} from "../actionTypes";

const initState = {
  isFetching: false,
  data: [],
  error: null,
  firstNameToggle: null,
  lastNameToggle: null,
  sexToggle: null,
  ageToggle: null,
  search: null,
};

function users(state = initState, action) {
  // get type and data from action object
  const { type, data, userId, order } = action;
  let sortedResult;

  switch (type) {
    case FETCH_USERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        data: [...data],
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case REMOVE_USERS_FROM_LIST:
      return {
        ...state,
        data: state.data.filter((user) => user._id !== userId),
      };
    case SEARCH_USERS:
      return {
        ...state,
        error: null,
        data: data,
      };
    case SORT_FIRST_NAME:
      if (order === "asc") {
        sortedResult = state.data.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
      } else if (order === "desc") {
        sortedResult = state.data.sort((a, b) =>
          b.firstName.localeCompare(a.firstName)
        );
      }

      return {
        ...state,
        data: [...sortedResult],
        firstNameToggle: !state.firstNameToggle,
        lastNameToggle: null,
        sexToggle: null,
        ageToggle: null,
      };

    case SORT_LAST_NAME:
      if (order === "asc") {
        sortedResult = state.data.sort((a, b) =>
          a.firstName.localeCompare(b.lastName)
        );
      } else if (order === "desc") {
        sortedResult = state.data.sort((a, b) =>
          b.firstName.localeCompare(a.lastName)
        );
      }

      return {
        ...state,
        data: [...sortedResult],
        lastNameToggle: !state.lastNameToggle,
        firstNameToggle: null,
        sexToggle: null,
        ageToggle: null,
      };

    case SORT_AGE:
      if (order === "asc") {
        sortedResult = state.data.sort((a, b) => a.age - b.age);
      } else if (order === "desc") {
        sortedResult = state.data.sort((a, b) => b.age - a.age);
      }

      return {
        ...state,
        data: [...sortedResult],
        ageToggle: !state.ageToggle,
        firstNameToggle: null,
        lastNameToggle: null,
        sexToggle: null,
      };

    case SORT_SEX:
      if (order === "asc") {
        sortedResult = state.data.sort((a, b) => a.sex.localeCompare(b.sex));
      } else if (order === "desc") {
        sortedResult = state.data.sort((a, b) => b.sex.localeCompare(a.sex));
      }

      return {
        ...state,
        data: [...sortedResult],
        sexToggle: !state.sexToggle,
        firstNameToggle: null,
        lastNameToggle: null,
        ageToggle: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

export default users;
