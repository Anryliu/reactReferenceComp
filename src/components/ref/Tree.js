import React, {Component} from 'react';
import {Tree} from 'tinper-bee';
import ScrollArea from 'react-scrollbar';

const {TreeNode} = Tree;
export default class RefTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {data,parentNodeDisableCheck} = this.props;
    const loop = datas => datas.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.id} title={item.refname} disableCheckbox={parentNodeDisableCheck}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.id} title={item.refname}/>;
    });
    return (
      <div className="c-tree">
        <ScrollArea speed={0.8} className="scroll" horizontal={false}>
          <Tree
            {...this.props}
          >
            {loop(data)}
          </Tree>
        </ScrollArea>
      </div>
    );
  }
}
