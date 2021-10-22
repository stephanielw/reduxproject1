import React, { Component } from "react";
import { Pagination, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { updatePageContentAction } from "../../../redux/action-creators/pagination";

class Cpagination extends Component {
  componentDidUpdate(preProps, preState) {
    if (this.props.users.data !== preProps.users.data) {
      this.props.updatePageContentAction(
        this.props.users.data,
        preProps.pagination.currentPage
      );
    }
  }
  changePage = (number) => {
    this.props.updatePageContentAction(this.props.users.data, number);
  };
  prevPage = () => {
    this.props.updatePageContentAction(
      this.props.users.data,
      this.props.pagination.currentPage - 1
    );
  };
  nextPage = () => {
    this.props.updatePageContentAction(
      this.props.users.data,
      this.props.pagination.currentPage + 1
    );
  };
  render() {
    // let active = 2;
    let items = [];
    items.push(
      <Pagination.Item
        key={"00"}
        disabled={this.props.pagination.currentPage === 1}
        onClick={this.prevPage}
      >
        Previous
      </Pagination.Item>
    );
    for (let number = 1; number <= this.props.pagination.totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === this.props.pagination.currentPage}
          onClick={() => this.changePage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    items.push(
      <Pagination.Item
        key={"11"}
        disabled={
          this.props.pagination.currentPage === this.props.pagination.totalPages
        }
        onClick={this.nextPage}
      >
        Next
      </Pagination.Item>
    );

    return (
      <Row>
        <Col>
          <span>Total Users: {this.props.users.data.length}</span>
          <Pagination className="float-end" size="sm">
            {items}
          </Pagination>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pagination: state.pagination,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePageContentAction: (users, currentPage) => {
      dispatch(updatePageContentAction(users, currentPage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cpagination);
