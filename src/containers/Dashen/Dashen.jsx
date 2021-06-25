import React, { Component } from 'react';
import { connect } from "react-redux"
import { getUserList } from "../../redux/actions"
import UserList from "../../components/UserList"

class Dashen extends Component {

 componentDidMount() {
  if (this.props.userList.length === 0) {
   this.props.getUserList('laoban')
  }
 }

 render() {
  return (
   <div>
    <UserList userList={this.props.userList}></UserList>
   </div>
  );
 }
}
export default connect(
 state => ({ userList: state.userList }),
 { getUserList }
)(Dashen);