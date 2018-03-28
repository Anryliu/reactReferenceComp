import React, {Component} from 'react';
import Ref from '../components/ref/Ref';
import {Modal} from 'tinper-bee';
import '../assets/index.css';
import {getTreeList} from './api';
import JsonData from './data';
import Error from '../components/ref/Error';
import TreeCheckedList from '../components/ref/TreeCheckedList';

class RefTree extends Component {
    constructor(props) {
        super(props);
        const {option} = props;
        const {checkedArray, multiple, checkStrictly, parentNodeDisableCheck} = option;

        this.state = {
            isShowModal: true,
            selectedArray: checkedArray || [], //  记录保存的选择项
            tabActiveKey: null, //  记录当前激活tab
            originKey: null, //  保留tab点击已选择的前一tab的key
            tabData: this.calctabData(option.tabData),
            //  tree state
            treeData: JsonData.data || [],
            defaultExpandAll: true,
            checkable: multiple,
            multiple,
            checkStrictly,
            parentNodeDisableCheck,
            checkedKeys: this.calcCheckedKeys(checkedArray) || [],
            showError: false,
            expandedKeys: [],
        };
    }

    componentWillMount() {
        // this.getRefTreeData();
    }

    onClickBtn = (type) => {
        const {onCancel, onSave} = this.props.option;
        switch (type) {
            case 'save':
                console.log(this.state.selectedArray);
                onSave(this.state.selectedArray);
                this.setState({
                    isShowModal: false
                });
                break;
            case 'cancel':
                this.setState({
                    selectedArray: [],
                    isShowModal: false,
                }, () => {
                    onCancel();
                });
                break;
            default:
                this.setState({selectedArray: []}, () => {
                    console.log(this.state.selectedArray);
                });
        }
        this.props.option.destory();
    };
    onSearchClick = (value) => {
        this.getRefTreeData(value);
    };
    onSearchChange = (value) => {
        this.getRefTreeData(value);
    };

    onTabSelect({activeKey, originKey}) {
        this.setState({
            tabActiveKey: activeKey,
            originKey,
        });
        this.getRefTreeData();
    }

    //  tree EventHandler
    onCheck(selectedKeys, event) {
        const arr = event.checkedNodes.map((item) => {
            return {refname: item.props.title, refpk: item.key, id: item.key}
        })
        this.setState({
            selectedArray: arr,
            checkedKeys: selectedKeys,
        });
    }

    onSelect(selectedKeys, event) {
        if (!this.props.option.multiple) {
            const arr = event.selectedNodes.map((item) => {
                return {refname: item.props.title, refpk: item.key, id: item.key}
            })
            this.setState({
                selectedArray: arr,
            });
        }
    }

    //   获取树组件数据
    getRefTreeData(value) {
        const {option} = this.props;
        let {param} = option;
        const {tabActiveKey} = this.state;
        const URL = option.refModelUrl.TreeUrl;
        if (option.isTab && option.tabData) {
            param = Object.assign(param, {
                transmitParam: {activeKey: tabActiveKey}
            });
        }
        getTreeList(URL, param, value).then((res) => {
            if (res) {
                const {data, page} = res;
                this.setState({
                    treeData: data,
                });
                if (data[0].id) {
                    this.setState({
                        expandedKeys: [data[0].id],
                    });
                }
            } else {
                this.setState({
                    showError: true,
                });
            }
        });
    }

    removeOne(c) {
        const {selectedArray} = this.state;
        const arr = selectedArray.filter((item) => {
            return item.refpk !== c.refpk;
        });
        const selectedKeys = arr.map((item) => {
            return item.refpk;
        });
        this.setState({
            selectedArray: arr,
            checkedKeys: selectedKeys,
        });
    }

    clearAll() {
        this.setState({
            selectedArray: [],
            checkedKeys: [],
        });
    }

    calcCheckedKeys(checkedArray = []) {
        let checkedKeys = [];
        if (checkedArray.length) {
            checkedKeys = checkedArray.map((item) => {
                if (item.refpk || item.id) {
                    return item.refpk || item.id;
                }
                return item;
            });
        }
        return checkedKeys;
    }

    calctabData(tabData) {
        return {dataSource: tabData,};
    }

    render() {
        const {option} = this.props;
        const {treeData, showError, isShowModal, tabActiveKey, tabData} = this.state;
        const {selectedArray, defaultExpandAll, checkedKeys, parentNodeDisableCheck} = this.state;
        const tabSheet = {
            flex: 1,
            width: 100,
        };
        return (
            <div>
                {
                    isShowModal ?
                        <Modal
                            show
                        >
                            <Modal.Body>
                                {
                                    treeData.length ?
                                        <Ref>
                                            <div>
                                                {
                                                    option.title ?
                                                        <div className="Reftitle">{option.title}</div> : <div></div>
                                                }
                                                {
                                                    option.RefSearch ?
                                                        <div
                                                            is="RefSearch"
                                                            onSearch={this.onSearchClick}
                                                            onChange={this.onSearchChange}
                                                        /> : <div></div>
                                                }
                                                {
                                                    <div className="treebox">
                                                        <div className="c-tree">
                                                            {
                                                                option.isTab ?
                                                                    <div
                                                                        style={tabSheet}
                                                                        is="Tab"
                                                                        data={tabData}
                                                                        selectedArray={option.selectedArray}
                                                                        ifNeedSelect='false'
                                                                        ifOnlyNeedSelect='false'
                                                                        onTabSelect={this.onTabSelect.bind(this)}
                                                                        tabActiveKey={tabActiveKey}
                                                                        originKey={this.state.originKey}
                                                                    /> : <div></div>
                                                            }
                                                            {
                                                                option.isTree ?
                                                                    <div
                                                                        is="Tree"
                                                                        data={this.state.treeData}
                                                                        defaultExpandAll={defaultExpandAll}
                                                                        checkable={this.state.checkable}
                                                                        onCheck={this.onCheck.bind(this)}
                                                                        onSelect={this.onSelect.bind(this)}
                                                                        checkedKeys={checkedKeys}
                                                                        checkStrictly={true}
                                                                        parentNodeDisableCheck={parentNodeDisableCheck}
                                                                    /> : <div></div>
                                                            }
                                                        </div>
                                                        {
                                                            option.multiple ?
                                                                <TreeCheckedList
                                                                    selectedArray={selectedArray}
                                                                    clearAll={this.clearAll.bind(this)}
                                                                    removeOne={this.removeOne.bind(this)}
                                                                /> : <div></div>
                                                        }
                                                    </div>
                                                }
                                                {
                                                    option.RefButton ?
                                                        <div is="RefButton" onClickBtn={this.onClickBtn}/> : <div></div>
                                                }
                                            </div>
                                        </Ref> : <div></div>}
                                <Error show={showError}></Error>
                            </Modal.Body>
                        </Modal> : null
                }
            </div>
        );
    }
}

export default RefTree;
