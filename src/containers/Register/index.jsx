import React, { Component } from 'react';
import {
  NavBar,
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  Radio,
  Button,
  Toast
} from "antd-mobile"
import ListItem from 'antd-mobile/lib/list/ListItem';

import { connect } from "react-redux"
// import {Redirect} from "react-router-dom"

import { register } from "../../redux/actions"




class Register extends Component {
  state = {
    username: '',
    password: '',
    password1: '',
    type: 'dashen'
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }

  // 点击登录跳转到Login
  toLogin = () => {
    this.props.history.push("/login");
  }
  // 点击注册
  register = async () => {
    const response = await this.props.register(this.state)
    console.log(response);
    if (response.code !== 0) return
    Toast.success('注册成功', 1)
    switch (response.type) {
      case "laoban":
        this.props.history.push("/bossinfo");
        break;
      case "dashen":
        this.props.history.push("/jobinfo");
        break;
      default:
        break;
    }
  }
  render() {
    const { type } = this.state
    const { msg } = this.props.user
    return (
      <div>
        <NavBar>全球直聘</NavBar>
        <WhiteSpace size="lg" />
        {
          msg ? <div style={{ color: "red", textAlign: 'center' }}>{msg}</div> : null
        }
        <WhiteSpace size="lg" />
        <WingBlank size="md">
          <List>
            <InputItem clear placeholder="请输入用户名" onChange={value => { this.handleChange('username', value) }}>用户名:</InputItem>
            <InputItem clear placeholder="请输入密码" onChange={value => { this.handleChange('password', value) }} type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <InputItem clear placeholder="请确认密码" onChange={value => { this.handleChange('password1', value) }} type="password">确认密码:</InputItem>
            <ListItem>
              <span>用户类型:</span>
              <Radio checked={type === "dashen"} onChange={() => { this.handleChange('type', 'dashen') }}>大神</Radio>
              <Radio checked={type === "laoban"} onChange={() => { this.handleChange('type', 'laoban') }}>老板</Radio>
            </ListItem>
          </List>
          <Button type="primary" onClick={this.register}>注册</Button>
          <Button onClick={this.toLogin}>登录</Button>
        </WingBlank>
      </div>
    );
  }
}



export default connect(
  state => ({
    user: state.user
  }),
  { register }
)(Register);