import {get, fetchJ} from '../utils';


// 树卡型 树的数据接口

export const getTree = (url, {type , param  }) => fetchJ(url,{
  transmitParam:type,
  ...param,
});

const getTableBar = (url,{param}) => fetchJ(url, {
  ...param,
})
const getTableBody = (url,{param, activepage = 0, activekey = null,searchvalue='',key}) => fetchJ(url, {
  ...param,
  'refClientPageInfo.currPageIndex': activepage,
  content:searchvalue,
  id:key,
})
export const getTreeTableData = (url,url2,value) => Promise.all([getTableBar(url,value), getTableBody(url2,value)]);