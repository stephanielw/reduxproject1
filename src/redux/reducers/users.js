import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  REMOVE_USER_START,
  REMOVE_USER_SUCCESS,
  SEARCH_USERS_START,
  SEARCH_USERS_SUCCESS,
  SORT_FIRST_NAME,
  SORT_LAST_NAME,
  SORT_AGE,
  SORT_SEX,
  UPDATE_USER_SUCCESS,
  UPDATE_PAGE_CONTENT,
  CREATE_USER_SUCCESS,
} from "../actionTypes";

const initState = {
  isFetching: false,
  data: [],
  error: null,
  firstNameToggle: null,
  lastNameToggle: null,
  sexToggle: null,
  ageToggle: null,
  search: "",
  isSearching: false,
  isDeleting: false,
  pagination: {
    currentPage: 1,
    usersPerPage: 5,
    currentUsers: [],
    totalPages: 0,
  },
};

function users(state = initState, action) {
  // get type and data from action object
  const { type, data, userId, order, currentPage, search } = action;
  let sortedResult;
  switch (type) {
    case FETCH_USERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_USERS_SUCCESS:
      const cpage = currentPage === undefined ? 1 : currentPage;
      const tmp = data.slice(
        (cpage - 1) * state.pagination.usersPerPage,
        state.pagination.usersPerPage * cpage
      );
      return {
        ...state,
        isFetching: false,
        error: null,
        data: data,
        pagination: {
          ...state.pagination,
          totalPages: Math.ceil(data.length / state.pagination.usersPerPage),
          currentUsers: tmp,
        },
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case CREATE_USER_SUCCESS:
      let oData = state.data;
      let isMatched = false;
      ["age", "firstName", "lastName", "sex"].forEach((v) => {
        if (data[v].indexOf(state.search) > -1) {
          isMatched = true;
        }
      });
      if (isMatched) {
        oData.push(data);
      }
      oData = sort(state, oData);
      return {
        ...state,
        data: oData,
        pagination: {
          ...state.pagination,
          totalPages: Math.ceil(oData.length / state.pagination.usersPerPage),
          currentUsers: oData.slice(
            (state.pagination.currentPage - 1) * state.pagination.usersPerPage,
            state.pagination.currentPage * state.pagination.usersPerPage
          ),
        },
      };
    case REMOVE_USER_START:
      return {
        ...state,
        isDeleting: true,
      };
    case REMOVE_USER_SUCCESS:
      let filteredRes = state.data.filter((user) => user._id !== userId);
      filteredRes = sort(state, filteredRes);
      const tps = Math.ceil(filteredRes.length / state.pagination.usersPerPage);
      let cp = state.pagination.currentPage;
      if (tps < cp) {
        cp = tps;
      }
      return {
        ...state,
        isDeleting: false,
        data: filteredRes,
        pagination: {
          ...state.pagination,
          totalPages: tps,
          currentPage: cp,
          currentUsers: filteredRes.slice(
            (cp - 1) * state.pagination.usersPerPage,
            cp * state.pagination.usersPerPage
          ),
        },
      };
    case SEARCH_USERS_START:
      return {
        ...state,
        search,
        isSearching: true,
        firstNameToggle: null,
        lastNameToggle: null,
        ageToggle: null,
        sexToggle: null,
      };
    case SEARCH_USERS_SUCCESS:
      let res = sort(state, data);
      console.log(data);
      return {
        ...state,
        error: null,
        data: res,
        isSearching: false,
        pagination: {
          ...state.pagination,
          totalPages: Math.ceil(res.length / state.pagination.usersPerPage),
          currentUsers: res.slice(0, state.pagination.usersPerPage),
          currentPage: 1,
        },
      };
    case SORT_FIRST_NAME:
      if (order === "asc") {
        sortedResult = searchByFirstNameASC(state.data);
      } else if (order === "desc") {
        sortedResult = searchByFirstNameDESC(state.data);
      }

      return {
        ...state,
        data: [...sortedResult],
        firstNameToggle: order === "asc" ? true : false,
        lastNameToggle: null,
        sexToggle: null,
        ageToggle: null,
        pagination: {
          ...state.pagination,
          currentUsers: sortedResult.slice(
            (state.pagination.currentPage - 1) * state.pagination.usersPerPage,
            state.pagination.usersPerPage * state.pagination.currentPage
          ),
        },
      };

    case SORT_LAST_NAME:
      if (order === "asc") {
        sortedResult = searchByLastNameASC(state.data);
      } else if (order === "desc") {
        sortedResult = searchByLastNameDESC(state.data);
      }

      return {
        ...state,
        data: [...sortedResult],
        lastNameToggle: order === "asc" ? true : false,
        firstNameToggle: null,
        sexToggle: null,
        ageToggle: null,
        pagination: {
          ...state.pagination,
          currentUsers: sortedResult.slice(
            (state.pagination.currentPage - 1) * state.pagination.usersPerPage,
            state.pagination.usersPerPage * state.pagination.currentPage
          ),
        },
      };

    case SORT_AGE:
      if (order === "asc") {
        sortedResult = searchByAgeASC(state.data);
      } else if (order === "desc") {
        sortedResult = searchByAgeDESC(state.data);
      }

      return {
        ...state,
        data: [...sortedResult],
        ageToggle: order === "asc" ? true : false,
        firstNameToggle: null,
        lastNameToggle: null,
        sexToggle: null,
        pagination: {
          ...state.pagination,
          currentUsers: sortedResult.slice(
            (state.pagination.currentPage - 1) * state.pagination.usersPerPage,
            state.pagination.usersPerPage * state.pagination.currentPage
          ),
        },
      };

    case SORT_SEX:
      if (order === "asc") {
        sortedResult = searchBySexASC(state.data);
      } else if (order === "desc") {
        sortedResult = searchBySexDESC(state.data);
      }

      return {
        ...state,
        data: [...sortedResult],
        sexToggle: order === "asc" ? true : false,
        firstNameToggle: null,
        lastNameToggle: null,
        ageToggle: null,
        pagination: {
          ...state.pagination,
          currentUsers: sortedResult.slice(
            (state.pagination.currentPage - 1) * state.pagination.usersPerPage,
            state.pagination.usersPerPage * state.pagination.currentPage
          ),
        },
      };
    case UPDATE_USER_SUCCESS:
      let originalData = state.data;
      originalData = originalData.map((d) => {
        if (d._id === data._id) {
          return {
            ...data,
          };
        } else {
          return d;
        }
      });
      originalData = sort(state, originalData);
      return {
        ...state,
        data: originalData,
        pagination: {
          ...state.pagination,
          currentUsers: originalData.slice(
            (state.pagination.currentPage - 1) * state.pagination.usersPerPage,
            state.pagination.usersPerPage * state.pagination.currentPage
          ),
        },
      };
    case UPDATE_PAGE_CONTENT:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage,
          totalPages: Math.ceil(
            state.data.length / state.pagination.usersPerPage
          ),
          currentUsers: [
            ...state.data.slice(
              (currentPage - 1) * state.pagination.usersPerPage,
              state.pagination.usersPerPage * currentPage
            ),
          ],
        },
      };

    default:
      return state;
  }
}

const sort = (state, data) => {
  if (state.firstNameToggle === true) {
    return searchByFirstNameASC(data);
  }
  if (state.firstNameToggle === false) {
    return searchByFirstNameDESC(data);
  }
  if (state.lastNameToggle === true) {
    return searchByLastNameASC(data);
  }
  if (state.lastNameToggle === false) {
    return searchByLastNameDESC(data);
  }
  if (state.sexToggle === true) {
    return searchBySexASC(data);
  }
  if (state.sexToggle === false) {
    return searchBySexDESC(data);
  }
  if (state.ageToggle === true) {
    return searchByAgeASC(data);
  }
  if (state.ageToggle === false) {
    return searchByAgeDESC(data);
  }
  return data;
};

const searchByFirstNameASC = (data) => {
  return data.sort((a, b) => a.firstName.localeCompare(b.firstName));
};

const searchByFirstNameDESC = (data) => {
  return data.sort((a, b) => b.firstName.localeCompare(a.firstName));
};

const searchByLastNameASC = (data) => {
  return data.sort((a, b) => a.lastName.localeCompare(b.lastName));
};

const searchByLastNameDESC = (data) => {
  return data.sort((a, b) => b.lastName.localeCompare(a.lastName));
};

const searchByAgeASC = (data) => {
  return data.sort((a, b) => a.age - b.age);
};

const searchByAgeDESC = (data) => {
  return data.sort((a, b) => b.age - a.age);
};

const searchBySexASC = (data) => {
  return data.sort((a, b) => a.sex.localeCompare(b.sex));
};

const searchBySexDESC = (data) => {
  return data.sort((a, b) => b.sex.localeCompare(a.sex));
};

export default users;
