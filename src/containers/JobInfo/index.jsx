import React, { Component } from 'react';
import { connect } from "react-redux"

import { NavBar, List, InputItem, TextareaItem, Button, Toast,Progress } from "antd-mobile"

import HeadSelect from "../../components/HeadSelect"
import { updata } from "../../redux/actions"
import { Redirect } from "react-router-dom"

class JobInfo extends Component {
  state = {
    header: '', // 头像名称 
    post: '', // 职位 
    info: '', // 个人或职位简介 
  }
  setHeader = (text) => {
    this.setState({ header: text })
  }
  jobInfoChange = (type, val) => {
    this.setState({ [type]: val })
  }
  save = async () => {
    const { header, post, info } = this.state
    if (!header || !post || !info) return Toast.fail("请完善信息", 1)
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
      const path = type === "dashen" ? "/dashen" : "/laoban"
      return <Redirect to={path}></Redirect>
    }
    

    return (
      <div>
        <Progress percent={30} position="fixed" />

        <NavBar className="title-navbar">求职者信息完善</NavBar>
        <HeadSelect setHeader={this.setHeader}></HeadSelect>
        <List>
          <InputItem onChange={val => { this.jobInfoChange('post', val) }}>求职岗位:</InputItem>
          <TextareaItem
            onChange={val => { this.jobInfoChange('info', val) }}
            title="个人介绍:"
            placeholder="请输入个人介绍"
            rows="3"
            ref={el => this.customFocusInst = el}
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
)(JobInfo);