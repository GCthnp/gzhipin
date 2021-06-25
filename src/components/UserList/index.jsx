import React, { Component } from 'react';
import { Card, PullToRefresh, WingBlank, WhiteSpace } from 'antd-mobile'
import PropsTypes from "prop-types"
import { withRouter } from "react-router-dom"

class UserList extends Component {

 static propsTypes = {
  userList: PropsTypes.array.isRequired
 }

 userRefresh = () => {
  console.log('下拉刷新');

 }

 render() {
  const { userList } = this.props
  return (

   <PullToRefresh
    onRefresh={this.userRefresh}
   >
    <div>
     <WingBlank size="lg">
      {
       userList.map(item => {
        if (!item.header) return null;
        return (
         <div key={item._id}>
          <WhiteSpace size="lg" />
          <Card onClick={()=>this.props.history.push(`/chat/${item._id}`)}>
           <Card.Header
            thumb={require(`../../assets/images/headers/${item.header}.png`).default}
            extra={<span>{item.username}</span>}
           />
           <Card.Body>
            <div>职位：前端</div>
            {item.company ? <div>公司：{item.company}</div> : null}
            {item.salary ? <div>月薪：{item.salary}</div> : null}
            <div>描述：{item.info}</div>
           </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
         </div>
        )
       })
      }
     </WingBlank>
    </div>
   </PullToRefresh>
  );
 }
}

export default withRouter(UserList);