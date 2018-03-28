import {get, fetchJ} from '../utils';
const getTableBar = (TableBarUrl,{param}) => fetchJ(TableBarUrl, {
  ...param,
})
const getTableBody = (TableBodyUrl,{ activepage = 0, activekey = null,searchvalue='',param}) => fetchJ(TableBodyUrl, {
  ...param,
  'refClientPageInfo.currPageIndex': activepage,
  'refShowClassCode': activekey,
  content:searchvalue,
})
export const getTableData = (TableBarUrl,TableBodyUrl,value) => Promise.all([getTableBar(TableBarUrl,value), getTableBody(TableBodyUrl,value)]);