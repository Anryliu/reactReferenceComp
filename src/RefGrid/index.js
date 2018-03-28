import React, {Component} from 'react';
import Ref from '../components/ref/Ref';
import {Modal} from 'tinper-bee';
import '../assets/index.css'
import { getList } from './api.js';
import JsonData from './data';

export default class RefGrid extends Component {
  constructor(props) {
    super(props);
    const {option} = this.props;
    this.state = {
      List:[],
      tableData:{},//存放表格数据
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

//列表接口
getRefList(value) {
  const {option} = this.props;
  const URL = option.refModelUrl.GridUrl;
    this.setState({
        List: JsonData.data,
    })
  //  getList(URL,option.param).then(({data}) => {
  //   if (data) {
  //     this.setState({
  //       List: data
  //     })
  //   }
  // })
}

//搜索接口
getSearchListFun(value) {
  const {option} = this.props
  const URL = option.refModelUrl.GridUrl;
  option.param.content=value
  getList(URL,option.param).then(({data}) => {
    if (data) {
      this.setState({
        List: data,
        tableData:{
          listData:data,
        },
      })
    }
  })
}


  componentWillMount(){
    var { option } = this.props;
    var { activepage } = this.state;
    if (option.RefList) {
      this.getRefList();
    }
    if (option.isTab) {
      this.getRefTabData({refCode: option.param.refCode});
    }
    if (option.isTable) {
      this.getRefTableData({refCode: option.param.refCode, activepage: 0});
    }
    if(option.isTree){
      this.getRefTreeData();

    }
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
        })
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
    this.getSearchListFun(value);
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

                    option.RefList ?
                      <div is="RefList" data={this.state.List} isRadio={option.isRadio || false} SelectArray={this.state.selectedArray}
                          RefListChecked={this.RefSelectedChecked}/> : <div></div>
                    }
                    {
                      option.RefButton ?
                        <div is="RefButton" onClickBtn={this.onClickBtn}/> : <div></div>
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
