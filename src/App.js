import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './assets/App.css';
import createModal from './createApi/createApi.es';
import {Button,Icon} from 'tinper-bee';
let option = {
    title: '弹窗标题',
    refType:4,//1:树形 2.单表 3.树卡型 4.多选 5.default
    isRadio:false,//1.true 单选 2.false多选
    hasPage:true,
    multiple:true,
    tabData:[//tab标签
        {"title":"常用","key":"commonUse"},
        {"title":"全部","key":"total"},
        {"title":"推荐","key":"recommed"}
    ],// option中可增加defaultActiveKey作为默认tab标签
    param:{ 
    },
    refModelUrl:{
        TreeUrl:'..rest/iref_ctr/blobRefTree', //树请求
        GridUrl:'..rest/iref_ctr/commonRefsearch',//单选多选请求
        TableBodyUrl:'..rest/iref_ctr/blobRefTreeGrid',//表体请求
        TableBarUrl:'..rest/iref_ctr/refInfo',//表头请求
    },
    checkedArray:[{refremark: "阿里骨干", refpk: "857c41b7-e1a3-11e5-aa70-0242ac11001d", refcode: "wujd", refname: "吴惊道", key: "857c41b7-e1a3-11e5-aa70-0242ac11001d"}],
    onCancel: function (p) {
        console.log(p)
    },
    onSave: function (sels) {
        console.log(sels);
    },
};

class App extends Component {
    handleClick(type,event) {
        const optarr = [
            Object.assign({},option,{refType:1,title: '树形参照',}),
            Object.assign({},option,{refType:2,title: 'Table参照',}),
            Object.assign({},option,{refType:3,title: 'Table参照',}),
            Object.assign({},option,{refType:4,title: 'Table参照',})
            ];
        createModal(optarr[type-1]);
    }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <div className="App-intro">
              <Button shape="border" onClick={ this.handleClick.bind(this,1) } colors="success">树形参照</Button>
              <Button shape="border" onClick={ this.handleClick.bind(this,2) } colors="success">Table参照</Button>
              <Button shape="border" onClick={ this.handleClick.bind(this,3) } colors="success">树表参照</Button>
              <Button shape="border" onClick={ this.handleClick.bind(this,4) } colors="success">枚举参照</Button>
              {/*<RefGlobal option={opt4}></RefGlobal>*/}
          </div>
          <div className="app-doc">
              <h2>
                  参照使用说明:
              </h2>
              <p className="App-intro">

                  <code>
                      import createModal from './createApi/createApi.es'; <br/>
                      createModal(option);
                  </code>

              </p>
          </div>

      </div>
    );
  }
}

export default App;
