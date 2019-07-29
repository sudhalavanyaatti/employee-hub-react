import React, { Component } from "react";
// import PropTypes from "prop-types";
// import _ from "lodash";
import { Grid, Row, Col } from "react-flexbox-grid";
import Pagination from "react-js-pagination";
import "../style.css";

class PagiNation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "1",
      noOfDetailsPerPage: "2",
      popup: false
    };
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  windowPopUp() {
    console.log("hello");
  }

  render() {
    const indexOfLast = this.state.activePage * this.state.noOfDetailsPerPage;
    const indexOfFirst = indexOfLast - this.state.noOfDetailsPerPage;
    console.log(
      Math.ceil(
        this.props.details.length / this.state.noOfDetailsPerPage,
        "length"
      )
    );
    const list = this.props.details.slice(indexOfFirst, indexOfLast);

    const renderPage = list.map((data, index) => {
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
            <Row style={{borderBottom:"1px solid #e4ebe6"}}>
              <Col xs={2} lg={2} sm={2} md={2} className="col">
                <img
                  className="responsive"
                  src={'http://localhost:3002'+data.profilePic}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%"
                  }}
                  alt={data.fullName}
                  onClick={this.props.popup.bind(this)}
                />
              </Col>
              <Col xs={3} lg={3} sm={3} md={3} className="col">
                <i>
                  {" "}
                  {data.fullName.charAt(0).toUpperCase() +
                    data.fullName.substring(1)}
                </i>
              </Col>
              <Col xs={3} lg={3} sm={3} md={3} className="col">
                {data.category.charAt(0).toUpperCase() +
                  data.category.substring(1)}
              </Col>
              <Col xs={3} lg={3} sm={3} md={3} className="col">
                <div>
                  {data.city}
                  <br />
                  {data.state}
                </div>
                {data.zip}
                <br />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    });

    return (
      <div>
        {renderPage}

        <Pagination
          hideNavigation
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.noOfDetailsPerPage}
          totalItemsCount={this.props.details.length}
          pageRangeDisplayed={2}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default PagiNation;
