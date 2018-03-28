import {get, fetchJ} from '../utils';


// 树树的数据接口

export const getTreeList = (url,param, content) => fetchJ(url, Object.assign(param,{content}));