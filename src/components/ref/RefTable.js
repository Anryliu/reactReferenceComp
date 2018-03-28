import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Table, Button, Checkbox, Pagination} from 'tinper-bee';

// import { getTableData} from '@/api.js';


class RefTable extends Component {
    //选择列表参数
    static defaultProps = {
        prefixCls: "bee-table",
        multiSelect: {
            type: "checkbox",
            param: "key",
        }
    };

    constructor(props) {
        super(props);
        this.onSelectTableItems = this.onSelectTableItems.bind(this);
    }

    // initScroll = (refTable) => {
    //   // 监听滚动加载u-table-tbody
    //   let self = this;
    //   refTable.addEventListener('scroll', self.props.onSendData(refTable), false);
    // }

    componentDidMount() {
        var refTable = ReactDOM.findDOMNode(this.refs.refTable).getElementsByClassName('u-table-body')[0];
        if (!this.props.hasPage) {
            this.props.onSendData(refTable);
        } else {
            //todo nothing
        }
    }

    handleSelect(eventKey) {
        this.props.handlePageSelect(eventKey);
    }

    onSelectTableItems(v) {
        this.props.onTableSelect(v);
    }

    //全选/全不选
    onAllCheckChange = () => {
        let self = this;
        let checkedArray = [];
        let listData = self.state.data.concat();
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            checkedArray[i] = !self.state.checkedAll;
        }
        self.setState({
            checkedAll: !self.state.checkedAll,
            checkedArray: checkedArray,
        });
        var a = listData.slice().filter((v, k) => {
            return checkedArray[k] == true;
        })
        this.onSelectTableItems(a);
    };
    //对某一个checkbox的点击事件
    onCheckboxChange = (text, record, index) => {
        let self = this;
        let allFlag = false;
        let checkedArray = self.state.checkedArray.concat();
        checkedArray[index] = !self.state.checkedArray[index];
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            if (checkedArray[i] == false) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        self.setState({
            checkedAll: allFlag,
            checkedArray: checkedArray,
        });
        var a = this.state.data.slice().filter((v, k) => {
            return checkedArray[k] == true;
        })
        this.onSelectTableItems(a)
    };
    clickRowHandler = (record, index, event) => {
        let checkedArray = this.state.checkedArray.concat();
        if (this.props.isRadio) {
            checkedArray = checkedArray.map((v, k) => {
                if (k !== index) {
                    return false;
                }
            })
        }
        checkedArray[index] = !this.state.checkedArray[index];
        this.setState({
            checkedArray: checkedArray
        });
        var a = this.state.data.slice().filter((v, k) => {
            return checkedArray[k] == true;
        })

        this.onSelectTableItems(a);
    }
    rowClassNameHandler = (record, index, indent) => {
        if (this.state.checkedArray[index]) {
            if (this.props.isRadio) {
                return 'selected';
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    renderColumnsMultiSelect(columns) {
        var self = this;
        const {data, checkedArray} = this.state;
        const {multiSelect} = this.props;
        let select_column = {};
        let indeterminate_bool = false;
        if (!this.props.isRadio) {
            if (multiSelect && multiSelect.type === "checkbox") {
                let i = checkedArray.length - 1;
                while (i >= 0) {
                    if (checkedArray[i]) {
                        indeterminate_bool = true;
                        break;
                    }
                    i--;
                }//判断是否有部分选中
                let defaultColumns = [
                    {
                        title: (
                            <Checkbox
                                className="table-checkbox"
                                checked={this.state.checkedAll}
                                indeterminate={indeterminate_bool && !this.state.checkedAll}
                                onChange={this.onAllCheckChange}
                            />
                        ),
                        key: "checkbox",
                        dataIndex: "checkbox",
                        width: "5%",
                        render: function (text, record, index) {
                            return (
                                <Checkbox
                                    className="table-checkbox"
                                    checked={checkedArray[index]}
                                    onChange={self.onCheckboxChange.bind(this, text, record, index)}
                                />
                            );
                        }
                    }
                ];
                columns = defaultColumns.concat(columns);
            }
        } else {
            columns = [{key: "radio", width: '5%'}].concat(columns);
        }
        return columns;
    }

    render() {
        var {listData = [], cols = []} = this.props.data;
        var selectedArray = this.props.selectedArray;
        var tabActiveKey = this.props.tabActiveKey;
        var len = listData.length;
        var checkedArrayCreater = new Array(len).fill(false)

        function ifInSelected(v, selectedArray) {
            let flag = false;
            selectedArray.forEach((val) => {
                if (val.key == v.key) flag = true
            })
            return flag;
        }

        listData.slice().forEach((v, k) => {
            ifInSelected(v, selectedArray) ? (checkedArrayCreater[k] = true) : (checkedArrayCreater[k] = false);
        })
        var data = null, checkedArray = null;
        if (tabActiveKey == '__selected') {
            //data = listData.filter((v,k)=>{return ifInSelected(v,selectedArray)});
            data = selectedArray;
            checkedArray = data.slice().forEach((v, k) => {
                ifInSelected(v, selectedArray) ? (checkedArrayCreater[k] = true) : (checkedArrayCreater[k] = false);
            })
        } else {
            data = listData;
            checkedArray = checkedArrayCreater;
        }
        this.state = {
            checkedAll: data.length == selectedArray.length && data.length != 0,
            checkedArray: checkedArrayCreater,
            data: data,
        };
        let columns = [
            {
                title: "编码",
                dataIndex: "refcode",
                key: "refcode1",
                width:140,
            },
            {
                title: "编码",
                dataIndex: "refcode",
                key: "refcode2",
                width:140,

            },
            {
                title: "名称",
                dataIndex: "refname",
                key: "refname",
            },

        ];
        let option = {
            scroll: {y: 300},
            emptyText: () => '对不起，无后台数据！',
            style: {'height': 351,},
        }
        return (
            <div className='tableCon'>
                <div className='tableWrap'>
                    <Table {...option} ref='refTable'
                           columns={columns}
                           data={this.state.data}
                           rowClassName={this.rowClassNameHandler}
                           onRowClick={this.clickRowHandler}/>
                </div>
            </div>
        )
    }
}

export default RefTable;
