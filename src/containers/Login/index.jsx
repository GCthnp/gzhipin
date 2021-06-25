import React, { Component } from 'react';
import {
 NavBar,
 WingBlank,
 WhiteSpace,
 List,
 InputItem,
 Button,
 Toast
} from "antd-mobile"
import { connect } from "react-redux"

import { login,selectUser } from "../../redux/actions"

class Login extends Component {

 state = {
  username: '',
  password: '',
 }

 getRedirectTo = (type, header) => {
  switch (type) {
   case "laoban":
    return header ? "/boss" : "/bossinfo"
   case "dashen":
    return header ? "/dashen" : "/jobinfo"
   default:
    break;
  }
 }

 handleChange = (name, value) => {
  this.setState({ [name]: value })
 }

 // 点击登录跳转到register注册
 toRegister = () => {
  this.props.history.push("/register");

 }
 // 点击登录
 login = async () => {
  const { username, password } = this.state
  if (username === '' || password === '') return Toast.fail('用户名或密码为空', 1);
  const res = await this.props.login(this.state)
  if (res.msg) return Toast.fail(res.msg, 1)
  Toast.success("登录成功", 1)
  // 可以登录，查询用户有没有补全信息。
  const userRes = await this.props.selectUser()
  const path = this.getRedirectTo(userRes.type,userRes.header)
  this.props.history.push(path)
 }

 render() {
  return (
   <div>
    <NavBar>全球直聘</NavBar>
    <WhiteSpace size="lg" />
    <WingBlank size="md">
     <List>
      <InputItem placeholder="请输入用户名" onChange={value => { this.handleChange('username', value) }}>用户名:</InputItem>
      <InputItem placeholder="请输入密码" onChange={value => { this.handleChange('password', value) }} type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
     </List>
     <Button type="primary" onClick={this.login}>登录</Button>
     <Button onClick={this.toRegister}>注册</Button>
    </WingBlank>
   </div>
  );
 }
}

export default connect(
 state => ({ user: state.user }),
 { login,selectUser }
)(Login);