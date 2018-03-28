import React, { Component } from 'react';
import { connect } from 'react-redux'
import {FormControl } from 'tinper-bee';

class RefSearch extends Component {
	constructor(props) {
    super(props);
    this.state = {
		value: ""
    }
  }
  onChange = (value) => {
    this.setState({value: value});
    if (this.props.onChange) {
      this.props.onChange(value);
    }
	}

	onSearch = (value) => {
    console.log("搜索" + value);
    if (this.props.onSearch) {
      this.props.onSearch(value);
    } else if (this.props.url) {
      //发请求
      //请求回来了
      // this.props.onGetSearchResult(data)
    }
	}
  render() {
    return (
      <div className="Ref-Search">
        <FormControl
            className="Search-input"
            value={this.state.value}
            onSearch={this.onSearch}
            onChange={this.onChange}
            placeholder="搜索"
            type="search"           
        />
      </div>
    );
  }
}

export default RefSearch;
