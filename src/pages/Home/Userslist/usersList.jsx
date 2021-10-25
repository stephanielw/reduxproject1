import React, { Component } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import "../Userslist/usersList.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import {
  SORT_FIRST_NAME,
  SORT_LAST_NAME,
  SORT_AGE,
  SORT_SEX,
} from "../../../redux/actionTypes";

class UsersList extends Component {
  componentDidMount() {
    if (!this.props.users.data.length) {
      this.props.fetchUsers();
    }
  }
  onDeleteUser = (userId) => {
    this.props.deleteUserAction(userId);
  };
  render() {
    const { firstNameToggle, lastNameToggle, sexToggle, ageToggle } =
      this.props.users;
    const { currentUsers } = this.props.users.pagination;
    return (
      <Row className="usersList">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Edit</th>
                <th>Delete</th>
                <th>
                  First Name{" "}
                  <FontAwesomeIcon
                    className={`arrowUp ${firstNameToggle ? "black" : "grey"}`}
                    onClick={() => this.props.sortUsers(SORT_FIRST_NAME, "asc")}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={`arrowDown ${
                      firstNameToggle === null || firstNameToggle
                        ? "grey"
                        : "black"
                    }
                    `}
                    onClick={() =>
                      this.props.sortUsers(SORT_FIRST_NAME, "desc")
                    }
                    icon={faSortDown}
                  />{" "}
                </th>
                <th>
                  Last Name{" "}
                  <FontAwesomeIcon
                    className={`arrowUp ${lastNameToggle ? "black" : "grey"}`}
                    onClick={() => this.props.sortUsers(SORT_LAST_NAME, "asc")}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={`arrowDown ${
                      lastNameToggle === null || lastNameToggle
                        ? "grey"
                        : "black"
                    }`}
                    onClick={() => this.props.sortUsers(SORT_LAST_NAME, "desc")}
                    icon={faSortDown}
                  />
                </th>
                <th>
                  Sex
                  <FontAwesomeIcon
                    className={`arrowUp ${sexToggle ? "black" : "grey"}`}
                    onClick={() => this.props.sortUsers(SORT_SEX, "asc")}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={`arrowDown ${
                      sexToggle === null || sexToggle ? "grey" : "black"
                    }`}
                    onClick={() => this.props.sortUsers(SORT_SEX, "desc")}
                    icon={faSortDown}
                  />
                </th>
                <th>
                  Age
                  <FontAwesomeIcon
                    className={`arrowUp ${ageToggle ? "black" : "grey"}`}
                    onClick={() => this.props.sortUsers(SORT_AGE, "asc")}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={`arrowDown ${
                      ageToggle === null || ageToggle ? "grey" : "black"
                    }`}
                    onClick={() => this.props.sortUsers(SORT_AGE, "desc")}
                    icon={faSortDown}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers &&
                currentUsers.map((p) => {
                  return (
                    <tr key={p._id}>
                      <td>
                        <Link to={`/update/${p._id}`}>
                          <Button type="button" className="btn btn-light">
                            Edit
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          type="button"
                          className="btn btn-light"
                          onClick={() => this.onDeleteUser(p._id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>{p.firstName}</td>
                      <td>{p.lastName}</td>
                      <td>{p.sex}</td>
                      <td>{p.age}</td>
                    </tr>
                  );
                })}
              {this.props.users.error ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    {this.props.users.error.message}
                  </td>
                </tr>
              ) : !this.props.users.data.length ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No Avaiable Data
                  </td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default UsersList;
