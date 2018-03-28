import React, {Component} from 'react';
export default class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      show
    } = this.props;
    const  className = show ? 'c-error show ':'c-error hide ';
    return (
      <div className={className}>
        没有查询到数据
      </div>
    );
  }
}
