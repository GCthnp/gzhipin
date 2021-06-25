import React, { Component } from 'react';
import { connect } from 'react-redux'

import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief


function getLastMsg(chatMsgs, userid) {
  const lastChatObj = {}

  chatMsgs.forEach(item => {  // {}

    // 如果消息是发给我的，并且read为false
    if (item.to === userid && !item.read) {
      item.unReadCount = 1
    } else {
      item.unReadCount = 0
    }

    let lastMsg = lastChatObj[item.chat_id]

    if (!lastMsg) {
      lastChatObj[item.chat_id] = item
    } else {
      // 先获取最后
      const unReadCount = lastMsg.unReadCount
      if (item.create_time > lastMsg.create_time) {
        lastChatObj[item.chat_id] = item
      }
      lastChatObj[item.chat_id].unReadCount = unReadCount + item.unReadCount
    }
  })

  const lastMsgs = Object.values(lastChatObj)
  lastMsgs.sort(function (m1, m2) {
    return m1.create_time - m2.create_time < 0
  })
  return lastMsgs
}

class Message extends Component {


  componentDidMount() {
    // this.props.readCount(this.props.chat.chatMsgs)
  }

  render() {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat
    const lastMsgs = getLastMsg(chatMsgs, user._id)
    console.log(lastMsgs);


    return (
      <div>
        <List>
          {
            lastMsgs.map(msg => {
              const newId = msg.from === user._id ? msg.to : msg.from
              const targetHeader = users[newId].header
              return (
                <Item key={msg._id}
                  onClick={() => { this.props.history.push(`/chat/${newId}`) }}
                  extra={<Badge text={msg.unReadCount} />}
                  thumb={require(`../../assets/images/headers/${targetHeader}.png`).default}
                  arrow='horizontal' >
                  {users[newId].username}
                  <Brief>{msg.context}</Brief>
                </Item>
              )
            })
          }
        </List>
      </div>
    );
  }
}

export default connect(
  state => ({
    chat: state.chat,
    user: state.user
  }),
  {}
)(Message);