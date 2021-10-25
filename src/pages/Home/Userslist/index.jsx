import { connect } from "react-redux";
import UsersList from "./usersList";
import {
  fetchUsers,
  deleteUserAction,
  sortUsers,
  updatePageContentAction,
} from "../../../redux/action-creators/users";

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
    deleteUserAction: (userId) => {
      dispatch(deleteUserAction(userId));
    },
    sortUsers: (type, order) => {
      dispatch(sortUsers(type, order));
    },
    updatePageContentAction: (users, currentPage) => {
      dispatch(updatePageContentAction(users, currentPage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
