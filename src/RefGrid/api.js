import {get, fetchJ} from '../utils';

//const config = 'http://workbench.yyuap.com/ref/diwork/iref_ctr';

export const getList = (url,parm) => fetchJ(url, parm);
