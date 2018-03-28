import React, { Component } from 'react';
import {Button} from 'tinper-bee';

class RefButton extends Component {
	constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  onClick = (type) => {
    this.props.onClickBtn(type)
	}
  render() {
    const { hasPage } = this.props;
    return (
      
        <div className={hasPage ? 'hasPage' : ''}>
          <div className="btnmargintop" style={{marginTop:'40px'}}></div>
          <div className="Ref-Button">
              <Button colors="danger" onClick={()=>this.onClick('save')}>保存</Button>
              <button className='cancelButton' onClick={()=>this.onClick('cancel')}>取消</button>
          </div>
        </div>
     
    );
  }
}

export default RefButton;
