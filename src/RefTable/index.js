import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Ref from '../components/ref/Ref';
import { Modal }from 'tinper-bee';
import '../assets/index.css'
import JsonData from './data';

import { getTableData } from './api.js';

export default class RefTable extends Component {
  constructor(props) {
    super(props);
    const {option} = this.props;
    this.state = {
      List:[],
      tableData:{
          listData:JsonData.data
      },//存放表格数据
      tabData:{},//存放tab标签的数据
      selectedArray:option.checkedArray || [],//记录保存的选择项
      tabActiveKey:null,//记录当前激活tab
      originKey:null,//保留tab点击已选择的前一tab的key
      isShowModal:true,//是否显示弹窗
      pageCount:0,//下拉加载数据使用--请求数据的总页数
      curPage:0,//下拉加载数据使用--请求数据的当前页
      ifScroll:false,//下拉加载数据使用--控制滚动事件
      refTable:null,//下拉加载数据使用--事件绑定对象
    }
  }


  //use to refresh tab data
  getRefTabData(value) {
    this.setState({
      tabData:{
        dataSource:this.props.option.tabData,
        defaultActiveKey:this.props.option.defaultActiveKey,
      }
    })
  }

  //use to refresh table dat
  getRefTableData(value) {
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
      })
    //
    // var { option:{refModelUrl:{TableBodyUrl,TableBarUrl}}} = this.props;
    // if(value.activepage && value.activepage>0){
    //   if(!this.props.option.hasPage){
    //       getTableData(TableBarUrl,TableBodyUrl,value).then(([barData,bodyData])=>{
    //         var tempData = []
    //         if(bodyData){
    //           tempData = bodyData.data.map((v,k)=>{
    //             v.key = v.refpk;
    //             return v;
    //           })
    //         }
    //         this.setState((prevData)=>({
    //           curPage:prevData.curPage+1,
    //           tableData:{
    //             listData:prevData.tableData.listData.concat(tempData),
    //             cols:prevData.tableData.cols,
    //           },
    //           ifScroll : false,
    //         }))
    //       })
    //   }else{
    //       getTableData(TableBarUrl,TableBodyUrl,value).then(([barData,bodyData])=>{
    //         var tempData = []
    //         if(bodyData){
    //           tempData = bodyData.data.map((v,k)=>{
    //             v.key = v.refpk;
    //             return v;
    //           })
    //         }
    //         this.setState((prevData)=>({
    //           curPage:value.activepage,
    //           tableData:{
    //             listData:tempData,
    //             cols:prevData.tableData.cols,
    //           }
    //         }))
    //       })
    //   }
    // }else{
    //     getTableData(TableBarUrl,TableBodyUrl,value).then(([barData, bodyData]) => {
    //       var nameArr = barData.strFieldName
    //       var barArr = barData.strFieldCode;
    //       var colsArr = barArr.map((v,k)=>{
    //         return {
    //           'title': nameArr[k],
    //           'dataIndex': v,
    //           'key': v,
    //           'width': 150,
    //         }
    //       })
    //       var listArr = bodyData.data.map((v, k) => {
    //         v.key = v.refpk;
    //         return v;
    //       })
    //       this.setState({
    //         tableData: {
    //           listData: listArr,
    //           cols: colsArr,
    //         },
    //         curPage:0,
    //         pageCount:bodyData.page.pageCount,
    //       })
    //     })
    // }
  }

  componentWillMount(){
    var { option } = this.props;
    var { activepage } = this.state;
    // if (option.RefList) {
    //   this.getRefList();
    // }
    // if (option.isTab) {
    //   this.getRefTabData();
    // }
    // if (option.isTable) {
    //   var value = Object.assign({},{param:option.param},{ activepage:0 ,activekey:this.state.tabActiveKey})
      this.getRefTableData(1);
    // }
    // if(option.isTree){
    //   this.getRefTreeData();
    // }
  }
  //按钮点击
  onClickBtn = (type) => {
    //console.log(type,this.state.RefListSelectArray)
    switch (type) {
      case 'save':
        console.log(this.state.selectedArray);
        this.setState({
          isShowModal: false
        })
        this.props.option.onSave(this.state.selectedArray);
        break;
      case 'cancel':
        this.setState({
          selectedArray: [],
          isShowModal: false
        }, () => {
          console.log(this.state.selectedArray);
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
  onSearchClick = (value) => {
    console.log(value)
    const { option } = this.props;
    const { activepage}=this.state;
    this.setState({
      searchvalue: value,
    })
    var value = Object.assign({},{param:option.param},{searchvalue:value})
    this.getRefTableData(value);
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
  onTabSelect({activeKey,originKey}){
    var { option } = this.props;
    this.setState({
      tabActiveKey: activeKey,
      originKey,
    })

    if(option.isTable){
      if(!option.hasPage){this.state.refTable.scrollTop = 0;}
      var value = Object.assign({},{param:option.param},{activekey:(originKey||activeKey)})
      this.getRefTableData(value);
      console.log(originKey||activeKey)
    }
  }
  handlePageSelect(eventKey){
    var { pageCount, curPage, originKey, tabActiveKey} = this.state;
    var { option } = this.props;
    curPage = eventKey - 1;
    var value = Object.assign({},{param:option.param},{activepage:curPage,activekey:(originKey||tabActiveKey)})
    this.getRefTableData(value)
  }
  onSendData(refTable){
    this.setState({refTable})
    const initScroll = ()=>{
      var { pageCount, curPage, ifScroll, originKey, tabActiveKey} = this.state;
      var { option } = this.props;
      if (ifScroll) return;
      const scrollerscrollHeight = refTable.scrollHeight; // 容器滚动总高度
      const scrollerHeight = refTable.getBoundingClientRect().height;// 容器滚动可见高度
      var scrollerTop = refTable.scrollTop;//滚过的高度
      if (scrollerscrollHeight - scrollerHeight - scrollerTop <= 10) {
        if(curPage+1 < pageCount){
          this.setState({ifScroll: true});
          var value = Object.assign({},{param:option.param},{activepage:curPage+1,activekey:(originKey||tabActiveKey)})
          this.getRefTableData(value)
        }else{
          // scrollerLoading = true;
        }
      }
    }
    refTable.addEventListener('scroll', initScroll, false);
  }
  /* tree的回调函数 ---end */
  onCheck(selectedKeys,event){
    debugger;
    this.setState({
      selectedArray:selectedKeys,
    })
  }
  onSelect(selectedKeys,event){
    debugger;
    this.setState({
      selectedArray:selectedKeys,
    })
  }
  //tree EventHandler

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
                  <div>
                    {
                      option.title ?
                        <div className="Reftitle">{option.title}</div> : <div></div>
                    }
                    {
                      option.RefSearch ?
                        <div is="RefSearch"
                             onSearch={this.onSearchClick}
                             onChange={this.onSearchChange}
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
                      option.isTable ?
                        <div is="RefTable"
                             data={this.state.tableData}
                             isRadio={option.isRadio||false}
                             onTableSelect={this.RefSelectedChecked.bind(this)}
                             onSendData={this.onSendData.bind(this)}
                             tabActiveKey ={this.state.tabActiveKey}
                             selectedArray ={this.state.selectedArray}
                             hasPage = {option.hasPage || false}
                             pageCount = {this.state.pageCount}
                             curPage = {this.state.curPage}
                             handlePageSelect = {this.handlePageSelect.bind(this)}
                        />: <div></div>
                    }
                    {
                      option.RefButton ?
                        <div is="RefButton"  hasPage = {option.hasPage || false} onClickBtn={this.onClickBtn}/> : <div></div>
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
//     <RefTable option={op}/>
//   ),
//   document.getElementById('root'),
// );
