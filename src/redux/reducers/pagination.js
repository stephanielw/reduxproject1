// import { UPDATE_PAGE_CONTENT } from "../actionTypes";

// const initState = {
//   currentPage: 1,
//   usersPerPage: 5,
//   currentUsers: [],
//   totalPages: 0,
// };

// function pagination(state = initState, action) {
//   const { type, users, currentPage } = action;
//   switch (type) {
//     case UPDATE_PAGE_CONTENT:
//       return {
//         ...state,
//         currentPage,
//         totalPages: Math.ceil(users.length / state.usersPerPage),
//         currentUsers: [
//           ...users.slice(
//             (currentPage - 1) * state.usersPerPage,
//             state.usersPerPage * currentPage
//           ),
//         ],
//       };
//     default:
//       return state;
//   }
// }

// export default pagination;
