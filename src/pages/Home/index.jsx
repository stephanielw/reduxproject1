import React, { Component } from "react";
import Cpagination from "./Cpagination";
import UsersList from "./Userslist/index";
import Search from "./Search";
import { Container } from "react-bootstrap";
import CreateUserBtn from "./CreateUserBtn";

class Home extends Component {
  render() {
    return (
      <Container>
        <Search />
        <UsersList />
        <Cpagination />
        <CreateUserBtn />
      </Container>
    );
  }
}

export default Home;
