import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RefGlobal from '../refer';

function createModal(config) {
    let div = document.createElement('div');
    document.body.appendChild(div);
    const destory = (args) =>{
        // const unmountResult = ReactDOM.unmountComponentAtNode(div);//销毁div中的所有react节点
        if(true && div.parentNode){
            div.parentNode.removeChild(div);
        }
    }
    const render = ( props )=>{
        ReactDOM.render(<RefGlobal option={props} />,div);
    } 
    render(config)
    return {
        destory:destory,
    }
}

module.exports = createModal;
// export createModal; 
