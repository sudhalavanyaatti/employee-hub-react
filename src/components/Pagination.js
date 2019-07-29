import React, { Component } from "react";
// import PropTypes from "prop-types";
// import _ from "lodash";
import { Grid, Row, Col } from "react-flexbox-grid";

class PagiNation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "1",
      todosPerPage: "3"
    };
  }
  handlePageChange(event) {
    console.log("event.target.key");
    console.log(event.target.class);

    this.setState({ activePage: Number(event.target.id) }, () => {
      console.log(this.state.activePage, "event");
    });
  }

  render() {
    const indexOfLastTodo = this.state.activePage * this.state.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
    console.log(
      Math.ceil(this.props.details.length / this.state.todosPerPage, "length")
    );
    const currentTodos = this.props.details.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );
    const renderTodos = currentTodos.map((todo, index) => {
      return (
        <div key={index}>
          <Grid
            fluid
            style={{
              paddingRight: "0px",
              paddingLeft: "0px",
              margin: "0px"
            }}
          >
            <Row>
              <Col xs={2} lg={2} sm={2} md={2} className="col">
                <img
                  className="responsive"
                  src={todo.profilePic}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%"
                  }}
                  alt={todo.fullName}
                />
              </Col>
              <Col xs={3} lg={3} sm={3} md={3} className="col">
                <i>
                  {" "}
                  {todo.fullName.charAt(0).toUpperCase() +
                    todo.fullName.substring(1)}
                </i>
              </Col>
              <Col xs={3} lg={3} sm={3} md={3} className="col">
                {todo.category.charAt(0).toUpperCase() +
                  todo.category.substring(1)}
              </Col>
              <Col xs={3} lg={3} sm={3} md={3} className="col">
                <div>
                  {todo.city}
                  <br />
                  {todo.state}
                </div>
                {todo.zip}
                <br />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    });
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.details.length / this.state.todosPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers, "page");
    const renderPageNumbers = pageNumbers.map(number => {
      console.log(number);
      return (
        <li key={number} id={number} onClick={this.handlePageChange.bind(this)}>
          {number}
        </li>
      );
    });

    return (
      <div>
        <ul>{renderTodos}</ul>
        <ul className="pageNumber">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default PagiNation;
