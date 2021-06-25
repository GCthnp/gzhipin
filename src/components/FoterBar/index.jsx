import React, { Component } from 'react';
import { TabBar } from "antd-mobile"
import { Item } from 'antd-mobile/lib/tab-bar';
import PropTypes from "prop-types"

import { withRouter } from "react-router-dom"


class FoterBar extends Component {


 static propTypes = {
  unReadCount: PropTypes.number.isRequired
 }

 render() {
  let { navList } = this.props
  navList = navList.filter(nav => !nav.hide)

  // 获取当前路由
  const path = this.props.location.pathname

  // console.log(this.props)
  return (


   <div className="foter-bar">
    <TabBar>
     {
      navList.map((item, index) => {
       return <Item
        key={item.path}
        title={item.text}
        icon={{ uri: require(`./nav/${item.icon}.png`).default }}
        selectedIcon={{ uri: require(`./nav/${item.icon}-selected.png`).default }}
        selected={path === item.path}
        onPress={() => this.props.history.replace(item.path)}
        badge={item.path === '/message' ? this.props.unReadCount : 0}
       ></Item>
      })
     }
    </TabBar>
   </div>
  );
 }
}

export default withRouter(FoterBar);