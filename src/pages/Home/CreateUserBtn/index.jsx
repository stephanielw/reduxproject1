import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class CreateUserBtn extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Link to="/create">
            <Button variant="primary">Create New User</Button>
          </Link>
        </Col>
      </Row>
    );
  }
}
