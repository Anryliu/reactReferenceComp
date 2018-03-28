import React, {Component} from 'react';
import {Tabs,Icon} from 'tinper-bee';
const {TabPane} = Tabs;

class Tab extends Component {
    constructor(props){
        super(props);
        this.onSelectTabItem = this.onSelectTabItem.bind(this);
    }
    onSelectTabItem({activeKey,originKey}){
        this.props.onTabSelect({activeKey,originKey});
    }
    onTabChange = (activeKey) => {
        let originKey = null;
        if(activeKey == '__selected'){
            originKey = this.state.activeKey;
        }
        this.setState({
            activeKey,
        });
        this.onSelectTabItem({activeKey,originKey});
    }
    construct() {
        let flag = this.state.activeKey==='__selected';
        const originKey = this.state.originKey;
        var tablist = this.state.tabs.map((t) => {
            return (
              <TabPane
                tab={
                    <div className='tabItem'>
                        <span>{t.title}</span>
                    </div>
                }
                key={t.key}
                />);
        })
        var seletedTab = [
            <TabPane
                disabled
                tab={
                    <div className='tabItem'>
                        <span>{`已选择（ ${this.state.selectNum} ）`}</span>
                    </div>
                }
                key={'__selectedChoosed'}
            />
        ]
        var selectTab = [
            <TabPane
                className='selectTab'
                tab={
                    <div className='tabSelectItem'>
                        <a style={{color: '#00bfff', cursor: 'pointer',lineHeight:'17px'}}
                           onClick={()=>{
                               if(flag){
                                   this.setState({activeKey:originKey});
                                   this.onTabChange(originKey);
                                }
                            }
                        }>
                            {flag?"收起已选择":`已选择（ ${this.state.selectNum} ）`}
                            <Icon
                                type={flag?"uf-gridcaretarrowup":"uf-arrow-down"}
                                className="close-icon"
                                style={{color:'red'}}
                            />
                        </a>
                  </div>
                  }
                key={'__selected'}
            />,
        ]
        if(this.props.ifNeedSelect && this.props.ifNeedSelect=='false'){
            return tablist.concat([
                <TabPane disabled key={'_blank'}/>
            ]);
        }
        if(this.props.ifOnlyNeedSelect && this.props.ifOnlyNeedSelect=='true'){
            return selectTab;
        }
        return (flag?seletedTab:tablist).concat(selectTab);
    }

    render() {
        var { dataSource ,defaultActiveKey} = this.props.data;
        var selectedArray = this.props.selectedArray || [];
        var tabActiveKey = this.props.tabActiveKey;
        var originKey = this.props.originKey;
        var activeKey;
        if(dataSource && dataSource.length>0){
            activeKey = tabActiveKey||defaultActiveKey||dataSource[0].key
        }else{
            activeKey = tabActiveKey||defaultActiveKey;
        }
        this.state = {
            tabs: dataSource||[],
            activeKey: activeKey,
            selectNum:selectedArray.length,
            originKey:originKey,
        };
        return (
            <div className='TabWrap'>
                <Tabs
                    className = 'TabClass'
                    activeKey={this.state.activeKey}
                    onChange={this.onTabChange}
                    // tabBarStyle='fade'
                    tabBarPosition='top'
                    defaultActiveKey="commonUse"
                    extraContent
                >
                    {this.construct()}
                </Tabs>
            </div>
        );
    }
}
export default Tab;
