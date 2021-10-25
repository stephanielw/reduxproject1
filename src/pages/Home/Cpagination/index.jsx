import React, { Component } from "react";
import { Pagination, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { updatePageContentAction } from "../../../redux/action-creators/users";

class Cpagination extends Component {
  componentDidUpdate(preProps, preState) {
    if (this.props.users.data !== preProps.users.data) {
      if (
        preProps.users.isDeleting &&
        this.props.users.isDeleting !== preProps.users.isDeleting
      ) {
        if (
          this.props.users.pagination.totalPages <
          preProps.users.pagination.currentPage
        ) {
          console.log("222");
          this.props.updatePageContentAction(
            this.props.users.pagination.totalPages
          );
        } else {
          console.log("333");
          this.props.updatePageContentAction(
            preProps.users.pagination.currentPage
          );
        }
      } else if (this.props.users.isSearching !== preProps.users.isSearching) {
        this.props.updatePageContentAction(1);
      } else {
        this.props.updatePageContentAction(
          preProps.users.pagination.currentPage
        );
      }
    }
  }
  changePage = (number) => {
    this.props.updatePageContentAction(number);
  };
  prevPage = () => {
    this.props.updatePageContentAction(
      this.props.users.pagination.currentPage - 1
    );
  };
  nextPage = () => {
    this.props.updatePageContentAction(
      this.props.users.pagination.currentPage + 1
    );
  };
  render() {
    // let active = 2;
    let items = [];
    items.push(
      <Pagination.Item
        key={"00"}
        disabled={this.props.users.pagination.currentPage === 1}
        onClick={this.prevPage}
      >
        Previous
      </Pagination.Item>
    );
    for (
      let number = 1;
      number <= this.props.users.pagination.totalPages;
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === this.props.users.pagination.currentPage}
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
          this.props.users.pagination.currentPage ===
          this.props.users.pagination.totalPages
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePageContentAction: (currentPage) => {
      dispatch(updatePageContentAction(currentPage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cpagination);
