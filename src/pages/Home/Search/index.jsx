import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { searchUsersAction } from "../../../redux/action-creators/users";
import { connect } from "react-redux";
class Search extends Component {
  searchUsers = (e) => {
    const search = e.target.value;
    this.props.searchUsersAction(search);
  };
  render() {
    return (
      <Row>
        <Col sm="5">
          <Form className="mt-5">
            <Form.Group as={Row} className="mb-3" controlId="search">
              <Form.Label column sm="3">
                Search
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  value={this.props.search}
                  type="text"
                  placeholder="search..."
                  onChange={this.searchUsers}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.users.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsersAction: (data) => {
      dispatch(searchUsersAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
