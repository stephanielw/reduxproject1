import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { updateUserForm } from "../../redux/action-creators/userForm";
import { createUserAction } from "../../redux/action-creators/users";
import {
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_AGE,
  UPDATE_SEX,
  UPDATE_PASSWORD,
  UPDATE_REPEAT,
} from "../../redux/actionTypes";

class CreateUser extends Component {
  createUser = () => {
    this.props.createUserAction(this.props.userForm, this.props.history);
  };
  goBack = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <Container>
        <Row>
          <Col sm="6" className="mt-5">
            <center>
              <h1 className="mb-5">Create a new user</h1>
            </center>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="firstname">
                <Form.Label column sm="3">
                  First Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="first name"
                    onChange={(e) =>
                      this.props.updateUserForm(
                        UPDATE_FIRST_NAME,
                        e.target.value
                      )
                    }
                  />
                  {this.props.userForm.firstName === "" ? (
                    <Form.Text className="text-danger flo">
                      First name is required
                    </Form.Text>
                  ) : null}
                </Col>{" "}
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="lastname">
                <Form.Label column sm="3">
                  Last Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    // ref={(c) => (this.lastName = c)}
                    type="text"
                    placeholder="last name"
                    onChange={(e) =>
                      this.props.updateUserForm(
                        UPDATE_LAST_NAME,
                        e.target.value
                      )
                    }
                  />
                  {this.props.userForm.lastName === "" ? (
                    <Form.Text className="text-danger flo">
                      Last name is required
                    </Form.Text>
                  ) : null}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="sex">
                <Form.Label column sm="3">
                  Sex
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    // ref={(c) => (this.sexNode = c)}
                    aria-label="Default select example"
                    onChange={(e) =>
                      this.props.updateUserForm(UPDATE_SEX, e.target.value)
                    }
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="age">
                <Form.Label column sm="3">
                  Age
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    placeholder="Age"
                    onChange={(e) =>
                      this.props.updateUserForm(UPDATE_AGE, e.target.value)
                    }
                  />
                  {parseInt(this.props.userForm.age) < 0 ? (
                    <Form.Text className="text-danger">
                      Age should be equal or larger than 0
                    </Form.Text>
                  ) : this.props.userForm.age === "" ? (
                    <Form.Text className="text-danger">
                      Age is required
                    </Form.Text>
                  ) : null}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="password">
                <Form.Label column sm="3">
                  Password
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      this.props.updateUserForm(UPDATE_PASSWORD, e.target.value)
                    }
                  />
                  {this.props.userForm.password === "" ? (
                    <Form.Text className="text-danger flo">
                      Password is required
                    </Form.Text>
                  ) : null}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="repeatpassword">
                <Form.Label column sm="3">
                  Repeat
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    placeholder="Repeat Password"
                    onChange={(e) =>
                      this.props.updateUserForm(UPDATE_REPEAT, e.target.value)
                    }
                  />
                  {this.props.userForm.repeat &&
                  this.props.userForm.repeat !==
                    this.props.userForm.password ? (
                    <Form.Text className="text-danger flo">
                      Both password should be matched
                    </Form.Text>
                  ) : null}
                </Col>
              </Form.Group>
            </Form>
            <hr />
            <Button
              disabled={
                !this.props.userForm.firstName ||
                !this.props.userForm.lastName ||
                this.props.userForm.age === null ||
                this.props.userForm.age === "" ||
                parseInt(this.props.userForm.age) < 0 ||
                !this.props.userForm.password ||
                !this.props.userForm.repeat ||
                this.props.userForm.password !== this.props.userForm.repeat
              }
              type="submit"
              variant="primary"
              onClick={this.createUser}
            >
              Create New User
            </Button>
            <Button
              onClick={this.goBack}
              variant="secondary"
              className="float-end"
            >
              Go Back
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userForm: state.userForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserForm: (type, value) => {
      dispatch(updateUserForm(type, value));
    },
    createUserAction: (user, history) => {
      dispatch(createUserAction(user, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
