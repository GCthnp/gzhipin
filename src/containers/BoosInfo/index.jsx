import React, { Component } from 'react';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { NavBar, List, InputItem, TextareaItem, Button, Toast } from "antd-mobile"

import HeadSelect from "../../components/HeadSelect"
import { updata } from "../../redux/actions"


class BossInfo extends Component {

 state = {
  header: '', // 头像名称 
  post: '', // 职位 
  info: '', // 个人或职位简介 
  company: '', // 公司名称 
  salary: '' // 工资
 }

 boosInfoChange = (type, val) => {
  this.setState({ [type]: val })
 }
 setHeader = (text) => {
  this.setState({ header: text })
 }
 save = async () => {
  const { header, post, info, company, salary } = this.state
  if (!header || !post || !info || !company || !salary) return Toast.fail("请完善信息", 1)
  const result = await this.props.updata(this.state)
  if (result.code === 1) {
   return Toast.fail(result.msg, 1, () => {
    this.props.history.push("/login")
   })
  }
  console.log(result);

 }


 render() {


  const { header, type } = this.props.user
  // debugger
  if (header) {
   const path = type === "dashen" ? "/dashen" : "/boss"
   return <Redirect to={path}></Redirect>
  }
  return (
   <div className="bossInfo">
    <NavBar className="title-navbar">Boos信息完善</NavBar>
    <HeadSelect setHeader={this.setHeader}></HeadSelect>
    <List>
     <InputItem onChange={val => { this.boosInfoChange('post', val) }}>招聘职位:</InputItem>

     <InputItem onChange={val => { this.boosInfoChange('company', val) }} >公司名称:</InputItem>
     <InputItem onChange={val => { this.boosInfoChange('salary', val) }}>职位薪资:</InputItem>
     <TextareaItem
      onChange={val => { this.boosInfoChange('info', val) }}
      title="职业要求:"
      placeholder="请输入职业要求"
      rows="3"
      ref={el => this.postInfo = el}
     />

     <Button type="primary" onClick={this.save}>保存</Button>

    </List>

   </div>
  );
 }
}

export default connect(
 state => ({ user: state.user }),
 { updata }
)(BossInfo);