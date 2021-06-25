import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom"
import cookie from "react-cookies"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { NavBar } from "antd-mobile"

import BossInfo from "../BoosInfo"
import JobInfo from "../JobInfo"
import Boss from "../Boss/Boss"
import Dashen from "../Dashen/Dashen"
import Message from "../Message/Message"
import Person from "../Person/Person"
import NotFound from "../../components/NotFound"
import FoterBar from "../../components/FoterBar"
import Chat from "../Chat/Chat"

import { selectUser } from "../../redux/actions"

class Main extends Component {
  state = {
    navList: [
      {
        path: '/dashen',
        component: Dashen,
        title: '老板列表',
        icon: 'dashen',
        text: '老板'
      },
      {
        path: '/boss',
        component: Boss,
        title: '大神列表',
        icon: 'laoban',
        text: '大神'
      },
      {
        path: '/message',
        component: Message,
        title: '消息列表',
        icon: 'message',
        text: '消息'
      },
      {
        path: '/person',
        component: Person,
        title: '用户中心',
        icon: 'personal',
        text: '个人'
      }
    ]
  }

  getRedirectTo = (type, header) => {
    switch (type) {
      case "laoban":
        return header ? "/boss" : "boosinfo"
      case "dashen":
        return header ? "/dashen" : "jobinfo"
      default:
        break;
    }
  }
  selectUser = () => {
    this.props.selectUser()
  }

  componentDidMount() {
    this.selectUser()
  }

  render() {
    const userid = cookie.load('userid')
    if (!userid) {
      this.props.history.replace('/login');
    }
    const { user } = this.props
    if (!user._id) {
      return null
    } else {
      let path = this.props.location.pathname;
      if (path === '/') {
        path = this.getRedirectTo(user.type, user.header)
        return <Redirect to={path}></Redirect>
      }
    }

    let { navList } = this.state
    // 获取当前的路由
    const pathname = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path === pathname)

    if (user.type === "dashen") {
      navList[1].hide = true
    } else {
      navList[0].hide = true
    }

    return (
      <div className="main">
        {currentNav ? <NavBar className="title-navbar">{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(item => {
              return <Route key={item.path} path={item.path} component={item.component}></Route>
            })
          }
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/jobinfo" component={JobInfo}></Route>
          <Route user={this.props.user} path="/chat/:userid" component={Chat}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        {currentNav ? <FoterBar unReadCount={this.props.unReadCount} navList={navList}></FoterBar> : null}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    unReadCount: state.chat.unReadCount
  }),
  { selectUser }
)(Main);