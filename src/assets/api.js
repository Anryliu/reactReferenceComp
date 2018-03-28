import {get, fetchJ} from 'src/utils';

// const config = 'http://172.20.14.27/ref/iref_ctr'
const tabBarConfig = '/ref/iref_ctr/refInfo';
const config = '/ref/diwork/iref_ctr';
//refCode=test_common
export const getList = (refCode) => fetchJ(config + '/commonRefsearch', {
  refCode,
});
//获取table数据接口--start
const getTableBar = ({refCode}) => fetchJ(tabBarConfig, {
  refCode,
})
const getTableBody = ({refCode, activepage = 0, activekey = null,searchvalue='',key}) => fetchJ(config + '/commonRefsearch', {
  refCode,
  'refClientPageInfo.currPageIndex': activepage,
  'refShowClassCode': activekey,
  content:searchvalue,
  key,
})
export const getTableData = (value) => Promise.all([getTableBar(value), getTableBody(value)]);
//获取table数据接口--end

export const getRefInfo = (refCode) => fetchJ(config + '/refInfo', {refCode})

export const getSearchList = (refCode, content) => fetchJ(config + '/filterRefJSON', {
  refCode,
  content,
  refModelUrl: 'http://workbench.yyuap.com/ref/testref_grid_ctr/'
});
// export const getTreeList = (param, content) => fetchJ(config + '/blobRef', Object.assign(param,{content}));
export const getTreeList = () =>get('getTreeData',{refCode:'123'});
//testTreeTable
export const getTreeDateList = (value) => get('getTableData',{
    refCode:value.refCode,
    content:value.searchvalue,
    key:value.key,
    activepage:value.activepage,
});

// 树卡型 树的数据接口
const newConfig = '/ref/rest/iref_ctr'
const newtabBarConfig = '/ref/rest/iref_ctr/refInfo'
export const getTree = ({ refCode , type  }) => fetchJ(newConfig+'/blobRefTree',{
  transmitParam:type,
  refCode,
  refModelUrl:'http://workbench.yyuap.com/ref/rest/testref_ctr/'
});

const getTableBar1 = ({refCode}) => fetchJ(newtabBarConfig, {
  refCode,
})
const getTableBody1 = ({refCode, activepage = 0, activekey = null,searchvalue='',key}) => fetchJ(newConfig + '/blobRefTreeGrid', {
  refCode,
  'refClientPageInfo.currPageIndex': activepage,
  'refShowClassCode': activekey,
  content:searchvalue,
  id:key,
  refModelUrl:'http://workbench.yyuap.com/ref/rest/testref_ctr/'
})
export const getTreeTableData = (value) => Promise.all([getTableBar1(value), getTableBody1(value)]);
