import React, { Component } from 'react';
import { Result, List, WhiteSpace, Button, Modal } from "antd-mobile"
import { connect } from 'react-redux'
import cookie from "react-cookies"
import { resetUser } from "../../redux/actions"

const Item = List.Item
const Brief = Item.Brief

class Person extends Component {
 logOut = () => {
  Modal.alert('退出', '你确定要退出登录吗??', [
   { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
   {
    text: 'OK', onPress: () => {
     cookie.remove('userid');
     this.props.resetUser()
     console.log('ok')
    }
   },
  ]);
 }

 render() {
  const { username, post, company, header, salary, info } = this.props.user
  return (
   <div style={{ marginTop: '49px' }} >
    <Result
     img={<img src={require(`../../assets/images/headers/${header}.png`).default} alt="header"></img>}
     title={username}
     message={company}
    />
    <List renderHeader={() => '相关信息'}>
     <Item multipleLine>
      <Brief>职位: {post}</Brief>
      <Brief>简介: {info}</Brief>
      {salary ? <Brief>薪资: {salary}</Brief> : null}
     </Item>
    </List>
    <WhiteSpace />
    <Button type="warning" onClick={this.logOut}>退出登录</Button>
   </div>
  );
 }
}

export default connect(
 state => ({ user: state.user }),
 { resetUser }
)(Person);