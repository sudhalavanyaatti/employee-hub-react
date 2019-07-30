import React, {Component} from 'react';
import { withRouter } from 'react-router';
// import Select from 'react-select';
import '../App.css';
import '../style.css';
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      city: '',
      state: '',
      zip: ''
      // countrylist:[],
      // country:''

    };
  }
  componentDidMount() {
  
    fetch('http://localhost:3002/profile', {
      method: 'get',
      headers: {
         'Authentication-Token' :localStorage.getItem ('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState({
            id: data.data._id,
            city: data.data.city,
            state: data.data.state,
            zip: data.data.zip
          });
        }
      });
    //   var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    // targetUrl = 'https://geodata.solutions/restapi?dd=1'
    //   fetch(proxyUrl+targetUrl, {
    //     method: 'GET'
    //   })
    //     .then(res => res.json())
    //     .then(response => {
          
    //       this.setState({
    //         countrylist: response
    //       },()=> console.log('list',this.state.countrylist)
    //       );
    //     });
    //     this.setState({

    //     })
  }
    handleChangeCity(event) {
      this.setState({
        city: event.target.value
      });
    }
    handleChangeState(event) {
      this.setState({
        state: event.target.value
      });
    }
    handleChangeZip(event) {
      this.setState({
        zip: event.target.value
      });
    }
    handleAddress(data) {
      data = {
        id: this.state.id,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      };
      fetch('http://localhost:3002/update-details', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authentication-Token' :localStorage.getItem ('token'),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => res.json())
        .then(response => {
          if(response)
          window.location.reload();
        });
    }
    render() {
      return (
        <div >
          <h2><strong>Address</strong></h2>
          <input
            type="text"
            value={this.state.city}
            onChange={event => this.handleChangeCity(event)}
            placeholder="City"
          />
          <input
            type="text"
            value={this.state.state}
            onChange={event => this.handleChangeState(event)}
            placeholder="State"
          />
          
           {/* <Select
          options={this.state.countrylist}
          value={this.state.countrylist}
          onChange={event => this.handleChangeCategory (event)}
          placeholder={this.state.countrylist}
          styles={colourStyles}
        /> */}
          <input
            type="tel"
            value={this.state.zip}
            onChange={event => this.handleChangeZip(event)}
            placeholder="Zip"
            minLength="6"
            maxLength="6"
          />
          <button type="submit" className="bstyle"  onClick={() => this.handleAddress()}>
            Save
          </button>
        </div>
      );
    }

}
// const colourStyles = {
//   control: styles => ({ ...styles, borderRadius: '15px',background: 'white', }),
//   option: styles => ({ ...styles,textAlign: 'center', borderRadius: '25px' }),
//   container: (styles) => ({
//     ...styles,
//     display: 'inline-block',
//     width: '80%',
//     textAlign: 'center',
//     border: 'none',
//     minHeight: '10px',
//   }),
//   valueContainer: (styles) => ({
//     ...styles,
//     minHeight: '5px',
//     height: '50px',
//     paddingTop: '0',
//     paddingBottom: '0',

//   })
// }
export default withRouter(Address);

