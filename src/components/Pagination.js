import React, {Component} from 'react';
// import PropTypes from "prop-types";
// import _ from "lodash";
import {Grid, Row, Col} from 'react-flexbox-grid';
import Pagination from 'react-js-pagination';
import '../style.css';

class PagiNation extends Component {
  constructor (props) {
    super (props);
    this.state = {
      activePage: '1',
      noOfDetailsPerPage: '3',
      popup: false,
    };
    this.handlePageChange = this.handlePageChange.bind (this);
  }
  handlePageChange (pageNumber) {
    this.setState ({activePage: pageNumber});
  }
  componentWillUnmount () {
    this.handlePageChange ();
  }
  windowPopUp () {
    console.log ('hello');
  }

  render () {
    const indexOfLast = this.state.activePage * this.state.noOfDetailsPerPage;
    const indexOfFirst = indexOfLast - this.state.noOfDetailsPerPage;
    console.log (
      Math.ceil (
        this.props.details.length / this.state.noOfDetailsPerPage,
        'length'
      )
    );
    const list = this.props.details.slice (indexOfFirst, indexOfLast);

    const renderPage = list.map ((data, index) => {
      return (
        <div key={index}>
          <Grid
            fluid
            style={{
              paddingRight: '0px',
              paddingLeft: '0px',
              margin: '0px',
            }}
          >
            <div>
              <Row
                style={{borderBottom: '1px solid #e4ebe6', textAlign: 'center'}}
              >

                <Col xs={1} lg={1} sm={1} md={1}>
                  <div className="userpicdisplay">
                    <img
                      className="responsive"
                      src={'http://localhost:3002' + data.profilePic}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                      }}
                      alt={data.fullName}
                      onClick={this.props.popup.bind (this)}
                    />
                  </div>
                </Col>
                <Col xs={4} lg={4} sm={4} md={4}>
                  <div className="userdisplay">
                    {data.fullName.charAt (0).toUpperCase () +
                      data.fullName.substring (1)}
                  </div>
                </Col>
                <Col xs={2} lg={2} sm={2} md={2}>
                  <div className="userdisplay">
                    {data.category.charAt (0).toUpperCase () +
                      data.category.substring (1)}
                  </div>
                </Col>
                <Col xs={2} lg={2} sm={2} md={2}>
                <div className="userdisplay">
                    {data.experience+' Years'}
                  </div>
                </Col>
               
                <Col xs={3} lg={3} sm={3} md={3}>
                <div>
                    {data.city}
                    <br />
                    {data.state}
                    <br />
                    {data.zip}
                  </div>
                </Col>
              </Row>
            </div>



            {/* <div>
              <Row
                style={{borderBottom: '1px solid #e4ebe6', textAlign: 'center'}}
              >

                <Col xs={2} lg={2} sm={2} md={2}>
                  <div className="userpicdisplay">
                    <img
                      className="responsive"
                      src={'http://localhost:3002' + data.profilePic}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                      }}
                      alt={data.fullName}
                      onClick={this.props.popup.bind (this)}
                    />
                  </div>
                </Col>
                <Col xs={3} lg={3} sm={3} md={3}>
                  <div className="userdisplay">
                    {data.fullName.charAt (0).toUpperCase () +
                      data.fullName.substring (1)}
                  </div>
                </Col>
                <Col xs={3} lg={3} sm={3} md={3}>
                  <div className="userdisplay">
                    {data.category.charAt (0).toUpperCase () +
                      data.category.substring (1)}
                  </div>
                </Col>
                <Col xs={3} lg={3} sm={3} md={3}>
                  <div>
                    {data.city}
                    <br />
                    {data.state}
                    <br />
                    {data.zip}
                  </div>
                </Col>
              </Row>
            </div> */}
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
          onChange={this.handlePageChange.bind (this)}
        />
      </div>
    );
  }
}

export default PagiNation;
