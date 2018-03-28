import React, { Component } from 'react';
import {Checkbox} from 'tinper-bee';

class RefList extends Component {
	constructor(props) {
    super(props);
    this.state = {
			dataList:[]
    }
	}
	componentWillMount(){
		
	}
	changeCheck=(checkid)=> {
	
		const { data,isRadio } = this.props;
		let selectArray=[];
		if(isRadio){
			data.forEach((item,index) => {
				if(item.refpk==checkid){
					item.checked=!item.checked;
				}else{
					item.checked=false;
				}
				if(item.checked){
					selectArray.push(item)
				}
			})
		}else{
			data.forEach((item,index) => {
				if(item.refpk==checkid){
					item.checked=!item.checked;
				}
				if(item.checked){
					selectArray.push(item)
				}
			})
		}
		this.props.RefListChecked(selectArray)
	}
  render() {
		const { data,SelectArray } = this.props
    const loop = data => data.map((item,index) => {
			item.checked=false
			SelectArray.forEach(element => {
				if(item.refpk==element.refpk){
					item.checked=true
				}
			});
      return (
			<div className="List-checkbox" key={index} >
				<Checkbox colors="info" checked={item.checked} onChange={()=>this.changeCheck(item.refpk)}></Checkbox>
				<span>{item.refname}</span>
			</div>
		);
    });
    return (
      <div className="Ref-List">
					{loop(data)}
      </div>
    );
  }
}

export default RefList;
