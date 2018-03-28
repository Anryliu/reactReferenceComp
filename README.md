# 参照组件

## 参照使用（参照test文件）
### 参数配置
```js
const option = {
    title: '弹窗标题',
    refType:4,
	isRadio:true,
	hasPage:false,
    tabData:[
        {"title":"常用","key":"commonUse"},
        {"title":"全部","key":"total"},
        {"title":"推荐","key":"recommed"}
    ],  
    param:{//url请求参数
    },
    refModelUrl:{
        TreeUrl:'$(url)rest/iref_ctr/blobRefTree', //树请求
        GridUrl:'$(url)rest/iref_ctr/commonRefsearch',//单选多选请求
        TableBodyUrl:'$(url)rest/iref_ctr/blobRefTreeGrid',//表体请求
        TableBarUrl:'$(url)rest/iref_ctr/refInfo',//表头请求
    },
    checkedArray:[],
    onCancel: function (p) {
      console.log(p)
    },
    onSave: function (sels) {
      console.log(sels);
    },
}
```
#### 参数说明
参数|说明|类型
---|-----|----
title|弹窗标题|`string`
refType|1:树形 2.单表 3.树卡型 4.多选 5.其他（默认树卡）|`number`
isRadio|1.true 单选 2.false多选 default:false|`boolen`
hasPage|分页标志 true:带分页 false:不带分页 default:false|`boolen`
tabData|标签数据 每个tab标签含有title与key|`Array<Object>`
param|url的请求参数 |`object`
refModelUrl|url的请求地址 |`object`
checkedArray|已选择数据项|`Array<Object>`
onCancel|取消时回调|`function`
onSave|确认时回调|`function`
### 使用流程

# License
MIT
