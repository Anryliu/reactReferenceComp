import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import Ref from '../components/ref/Ref';
import {Modal} from 'tinper-bee';
import '../assets/index.css';
import './index.css'
// import {getTree, getTreeTableData} from './api.js';
import JsonData from './data';

export default class RefTreeTable extends Component {
    constructor(props) {
        super(props);
        const {option} = this.props;
        const data = [{
            refname: '总经理',
            refpk: 'zjl',
            refcode: 'zjl',
            key: 11,
            id:'123',
            children: [
                {
                    refname: '福总经理',
                    refpk: 'fzjl',
                    refcode: 'fzjl',
                    key: 222,
                    id:'12322',

                    children: [
                        {
                            refname: '一厂长',
                            refpk: ' yfzjl',
                            refcode: 'yfzjl',
                            key: 31,
                            id:'12121fs3',

                        },
                        {
                            refname: '二厂长',
                            refpk: ' 2yfzjl',
                            refcode: 'yfzjl',
                            key: 32,
                            id:'121gfh21fs3',
                        },
                        {
                            refname: '三厂长',
                            refpk: ' 3yfzjl',
                            refcode: '3yfzjl',
                            key: 33,
                            id:'11121gfh21fs3',
                        },
                        {
                            refname: '四厂长',
                            refpk: ' 四3yfzjl',
                            refcode: '四3yfzjl',
                            key: '四',
                            id:'四121gfh21fs3',
                        },
                        {
                            refname: '五厂长',
                            refpk: ' 五3yfzjl',
                            refcode: '五3yfzjl',
                            key: '五',
                            id:'五121gfh21fs3',
                        },
                        {
                            refname: '六厂长',
                            refpk: ' 六3yfzjl',
                            refcode: '六3yfzjl',
                            key: '六',
                            id:'六121gfh21fs3',
                        },
                    ]
                }
            ]
        }];
        this.state = {
            treeData: data || [],
            treeIdactive: data[0].id || 1,
            tableData: {
                listData: JsonData.data
            },
            tabData: {},//存放tab标签的数据
            selectedArray: option.checkedArray || [],//记录保存的选择项
            tabActiveKey: null,//记录当前激活tab
            originKey: null,//保留tab点击已选择的前一tab的key
            isShowModal: true,//是否显示弹窗
            pageCount: 0,//下拉加载数据使用--请求数据的总页数
            curPage: 0,//下拉加载数据使用--请求数据的当前页
            ifScroll: false,//下拉加载数据使用--控制滚动事件
            refTable: null,//下拉加载数据使用--事件绑定对象
            searchvalue: '',
            option: {},
        }
    }

    //use to refresh table data
    getRefTableData(value) {
        const {option} = this.props
        const URL2 = option.refModelUrl.TableBodyUrl;
        const URL = option.refModelUrl.TableBarUrl;

        const  tmpar = JsonData.data.map((v,k)=>{
            v.key = v.refpk;
            return v;
        });
        this.setState({
            curPage:1,
            tableData:{
                listData:tmpar,
                cols:3,
            },
            ifScroll : false,
        });

        /* if (value.activepage && value.activepage > 0) {
             if (!this.props.option.hasPage) {
                 getTreeTableData(URL, URL2, value).then(([barData, bodyData]) => {
                     var tempData = []
                     if (bodyData) {
                         tempData = bodyData.data.map((v, k) => {
                             v.key = v.refpk;
                             return v;
                         })
                     }
                     this.setState((prevData) => ({
                         curPage: prevData.curPage + 1,
                         tableData: {
                             listData: prevData.tableData.listData.concat(tempData),
                             cols: prevData.tableData.cols,
                         },
                         ifScroll: false,
                     }))
                 })
             } else {
                 getTreeTableData(URL, URL2, value).then(([barData, bodyData]) => {
                     var tempData = []
                     if (bodyData) {
                         tempData = bodyData.data.map((v, k) => {
                             v.key = v.refpk;
                             return v;
                         })
                     }
                     this.setState((prevData) => ({
                         curPage: value.activepage,
                         tableData: {
                             listData: tempData,
                             cols: prevData.tableData.cols,
                         }
                     }))
                 })
             }
         }
         else {
             getTreeTableData(URL, URL2, value).then(([barData, bodyData]) => {
                 var nameArr = barData.strFieldName
                 var barArr = barData.strFieldCode;
                 var colsArr = barArr.map((v, k) => {
                     return {
                         'title': nameArr[k],
                         'dataIndex': v,
                         'key': v,
                         'width': 100,
                     }
                 })
                 var listArr = bodyData.data.map((v, k) => {
                     v.key = v.refpk;
                     return v;
                 })
                 this.setState({
                     tableData: {
                         listData: listArr,
                         cols: colsArr,
                     },
                     curPage: 0,
                     pageCount: bodyData.page.pageCount,
                 })
             })
         }*/
    }

    // 获取树组件数据
    getRefTreeData(type) {
        const {option} = this.props;
        const {activepage} = this.state;
        const URL = option.refModelUrl.TreeUrl;
        var value = Object.assign({}, {param: option.param}, type)
        this.getRefTableData();
        // getTree(URL, value).then(({data}) => {
        //     if (data) {
        //         this.setState({
        //             treeData: data,
        //             treeIdactive: data[0].id
        //         })
        //         const treeId = data[0].id //默认树第一个id
        //         var paramVal = Object.assign({}, {param: option.param}, {activepage: 0, key: treeId})
        //         this.getRefTableData(paramVal);
        //     }
        // })
    }

    componentWillMount() {
        const {option} = this.props;
        this.setState({
            option: option,
            tabData: {
                dataSource: option.tabData,
                defaultActiveKey: option.defaultActiveKey,

            }
        })
        this.getRefTreeData();
    }

    //按钮点击
    onClickBtn = (type) => {
        //console.log(type,this.state.RefListSelectArray)
        switch (type) {
            case 'save':
                console.log(this.state.selectedArray);
                this.props.option.onSave(this.state.selectedArray)
                this.setState({
                    isShowModal: false
                });
                break;
            case 'cancel':
                this.setState({
                    selectedArray: [],
                    isShowModal: false
                }, () => {
                    console.log('取消了');
                    this.props.option.onCancel(this.state.selectedArray)
                });
                break;
            default:
                this.setState({selectedArray: []}, () => {
                    console.log(this.state.selectedArray);
                    //this.props.options.onSave(this.state.RefListSelectArray)
                });
        }
        //this.props.options.onSave(this.state.RefListSelectArray)
        this.props.option.destory();
    }
    //搜索点击发请求
    onSearchClick = (value) => {
        console.log(value)
        const {treeIdactive, activepage, option} = this.state
        this.setState({
            searchvalue: value,
        })
        var paramVal = Object.assign({}, {param: option.param}, {searchvalue: value, key: treeIdactive})
        this.getRefTableData(paramVal);
    }
    //搜索输入变化触发
    onSearchChange = (value) => {
        console.log(value)
    }
    //选中数组保存回调
    RefSelectedChecked = (selectedArray) => {
        console.log(selectedArray)
        this.setState({
            selectedArray
        })
    }

    /* tab与table的回调函数 ---start */
    onTabSelect({activeKey, originKey}) {
        this.setState({
            tabActiveKey: activeKey,
            originKey,
        })

        if (this.props.option.isTable) {
            this.getRefTreeData({type: (originKey || activeKey)});
        }
    }

    /* tree的回调函数 ---end */
    onSelect(selectedKeys, event) {
        var {searchvalue, activepage} = this.state;
        var {option} = this.props;
        console.log(selectedKeys[0])
        this.setState({
            treeIdactive: selectedKeys[0]
        })
        var paramVal = Object.assign({}, {param: option.param}, {key: selectedKeys[0], searchvalue: searchvalue})
        this.getRefTableData(paramVal)

    }

    //tree EventHandler
    handlePageSelect(eventKey) {
        var {pageCount, curPage, originKey, tabActiveKey} = this.state;
        var {option} = this.props;
        curPage = eventKey - 1;
        var value = Object.assign({}, {param: option.param}, {
            activepage: curPage,
            activekey: (originKey || tabActiveKey)
        })
        this.getRefTableData(value)
    }

    onSendData(refTable) {
        this.setState({refTable})
        const initScroll = () => {
            var {pageCount, curPage, ifScroll, originKey, tabActiveKey, treeIdactive, searchvalue} = this.state;
            var {option} = this.props
            if (ifScroll) return;
            const scrollerscrollHeight = refTable.scrollHeight; // 容器滚动总高度
            const scrollerHeight = refTable.getBoundingClientRect().height;// 容器滚动可见高度
            var scrollerTop = refTable.scrollTop;//滚过的高度
            if (scrollerscrollHeight - scrollerHeight - scrollerTop <= 10) {
                if (curPage + 1 < pageCount) {
                    this.setState({ifScroll: true});
                    var paramVal = Object.assign({}, {param: option.param}, {
                        activepage: curPage + 1,
                        key: treeIdactive,
                        searchvalue: searchvalue
                    })
                    this.getRefTableData(paramVal)
                } else {
                    // scrollerLoading = true;
                }
            }
        }
        refTable.addEventListener('scroll', initScroll, false);
    }


    render() {
        const {option} = this.props;
        const {isShowModal} = this.state;
        return (
            <div>
                {
                    isShowModal ?
                        <Modal
                            show={true}
                        >
                            <Modal.Body>
                                <Ref>
                                    <div className="TreeTable">
                                        {
                                            option.title ?
                                                <div className="Reftitle">{option.title}</div> : <div></div>
                                        }
                                        {
                                            option.RefSearch ?
                                                <div is="RefSearch"
                                                     onSearch={this.onSearchClick}
                                                     onChange={this.onSearchChange}
                                                    // onGetSearchResult={this.onSearchGetResult}
                                                    // url={'www.baidu.com'}
                                                /> : <div></div>
                                        }
                                        {
                                            option.isTab ?
                                                <div is="Tab"
                                                     data={this.state.tabData}
                                                     selectedArray={this.state.selectedArray}
                                                     ifNeedSelect='true'
                                                     ifOnlyNeedSelect='false'
                                                     onTabSelect={this.onTabSelect.bind(this)}
                                                     tabActiveKey={this.state.tabActiveKey}
                                                     originKey={this.state.originKey}
                                                /> : <div></div>
                                        }
                                        {
                                            option.isTree ?
                                                <div is="Tree"
                                                     data={this.state.treeData} //
                                                     multiple={false}  //是否允许选择多个树节点
                                                     checkable={false} //是否支持添加在树节点前添加Checkbox
                                                     defaultExpandAll={true}//默认是否展开所有节点
                                                     onSelect={this.onSelect.bind(this)} //
                                                /> : <div></div>
                                        }

                                        {
                                            option.isTable ?
                                                <div is="RefTable"
                                                     data={this.state.tableData}
                                                     isRadio={option.isRadio || false}
                                                     onTableSelect={this.RefSelectedChecked.bind(this)}
                                                     onSendData={this.onSendData.bind(this)}
                                                     tabActiveKey={this.state.tabActiveKey}
                                                     selectedArray={this.state.selectedArray}
                                                     hasPage={option.hasPage || false}
                                                     pageCount={this.state.pageCount}
                                                     curPage={this.state.curPage}
                                                     handlePageSelect={this.handlePageSelect.bind(this)}
                                                /> : <div></div>
                                        }
                                        {
                                            option.RefButton ?
                                                <div is="RefButton" hasPage={option.hasPage || false}
                                                     onClickBtn={this.onClickBtn}/> : <div></div>
                                        }
                                    </div>
                                </Ref>
                            </Modal.Body>
                        </Modal> : null
                }
            </div>
        );
    }
}

// ReactDOM.render(
//   (
//     <RefTreeTable option={op}/>
//   ),
//   document.getElementById('root'),
// );
