import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RefGlobal from '../refer';

export default function createModal(config){
    let div = document.createElement('div');
    document.body.appendChild(div);
    function destory (args) {
        if(true && div.parentNode){
            try{
                div.parentNode.removeChild(div);
            }
            catch(e){
                console.log(e)
            }
        }
    }
    function render ( props ){
        ReactDOM.render(<RefGlobal option={props} />,div);
    } 
    render({...config,destory})
    return {
        destory:destory,
    }
}


