import React, {Component} from 'react';
import RefTreeTable from './RefTreeTable';
import RefTree from './RefTree';
import RefTable from './RefTable';
import RefGrid from './RefGrid';

export default class RefGlobal extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const { option } = this.props;
        const { refType , checkedArray } = option;
        let realType = null;
        let childComponent = {};
        switch(refType){
            case 1:
                childComponent = {
                    RefSearch: false,
                    isTab: false,
                    isTree: true,
                    RefButton: true,
                };
                let option1 = Object.assign({},childComponent,option);
                realType = <RefTree option={option1}/>;
                break;
            case 2:
                childComponent = {
                    RefSearch: true,
                    isTab: true,
                    isTable: true,
                    RefButton: true,
                }
                let option2 = Object.assign({},childComponent,option)
                realType = <RefTable option={option2}/>;
                break;
            case 3:
                childComponent = {
                    RefSearch: true,
                    isTab: true,
                    isTree: true,
                    isTable: true,
                    RefButton: true,
                }
                let option3 = Object.assign({},childComponent,option)
                realType = <RefTreeTable option={option3}/>;
                break;
            case 4:
                childComponent = {
                    RefSearch: true,
                    RefList: true,
                    RefButton: true,
                }
                let option4 = Object.assign({},childComponent,option)
                realType = <RefGrid option={option4}/>;
                break;
            default:
                childComponent = {
                    RefSearch: true,
                    isTab: true,
                    isTree: true,
                    isTable: true,
                    RefButton: true,
                }
                let defaultopt = Object.assign({},childComponent,option)
                realType = <RefTreeTable option={defaultopt}/>;
        }
        return (
            <div>
                {realType}
            </div>
        )
    }

}
