import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RefList from './RefList';
import RefSearch from './RefSearch';
import RefButton from './RefButton';
import RefTable from './RefTable';
import Tab from './Tab';
import Tree from './Tree';

const components = {
  RefList,
  RefSearch,
  RefButton,
  Tree,
  RefTable,
  Tab,
}

class Ref extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    options: PropTypes.PropTypes.shape({
    }),
  };

  static defaultProps = {
    options: {},
  };
  /*
  constructor(props) {
    super(props);
    this.state = {
      data: props.options.data || {},
      selected: [],
    }
  }
  */
  componentWillMount() {
    const {
      options,
      options: {
        url,
      },
    } = this.props;
    if (url) {
      // get(
      //   url,
      //   options,
      // ).then((data) => {
      //   console.log(data);
      //   /*
      //   this.setState({
      //     data,
      //   });
      //   */
      // });
    }
  }
  transformComponent(children) {
    if (children) {
      return React.Children.map(
        children,
        (child) => {
          const {
            props,
            props: {
              is,
              className,
            },
          } = child;
          if (is && components[is]) {
            return React.createElement(
              components[is],
              props,
              this.transformComponent(props.children),
            );
          }
          if(className=="Reftitle"){
            return React.createElement(
              'div',
              props,
            );
          }
          return React.cloneElement(
            child,
            props,
            this.transformComponent(props.children),
          );
        },
      );
    }
    return [];
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        {
          this.transformComponent(children)
        }
      </div>
    );
  }
}

Ref.RefList = RefList;
Ref.RefSearch = RefSearch;
Ref.RefButton = RefButton;
Ref.Tree = Tree;
Ref.RefTable = RefTable;
Ref.Tab= Tab;

export default Ref;
