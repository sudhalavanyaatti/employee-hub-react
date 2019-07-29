import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Select, { components } from 'react-select';
import Flag from '../Flag';
import P from '../P';
import Row from '../Row';
import countryFlagList from '../../countryFlagList';

const { Option } = components;

export default class DropdownSelect extends Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: f => f
  };

  state = {
    selectedOption: ''
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => {
      this.props.onClick(this.state.selectedOption.value);
    });
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        {...this.props}
        classNamePrefix="filter"
        components={{ Option: IconOption }}
        defaultMenuIsOpen
        defaultValue={selectedOption}
        label="Single select"
        onChange={this.handleChange}
        options={countryFlagList}
        placeholder="Type a currency / country"
        styles={customStyles}
        value={selectedOption}
      />
    );
  }
}

const customStyles = {
  option: provided => ({
    ...provided,
    backgroundColor: '#ffffff',
    color: '#666666',
    cursor: 'pointer',
    height: 70,
    padding: 20,
    '&:hover': {
      backgroundColor: '#EEEEEE'
    }
  })
};

const IconOption = props => {
  IconOption.propTypes = {
    data: PropTypes.object.isRequired
  };
  return (
    <Option {...props}>
      <Row>
        <Flag name={props.data.value.toLowerCase()} size="lg" />
        <P>{props.data.value}</P>
        <P style={{ paddingLeft: '5px' }}>{props.data.label}</P>
      </Row>
    </Option>
  );
};