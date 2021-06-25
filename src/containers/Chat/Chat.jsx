/*对话聊天的路由组件 */
import React, { Component } from 'react'
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'
import { connect } from "react-redux"
import { sendMsg, readCount } from "../../redux/actions"

const Item = List.Item

class Chat extends Component {
  state = {
    context: '',
    toggleShow: false
  }

  scrollToBottn = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }
  componentDidMount() {
    this.emojis = ['😂', '😅', '😎',
      '😡', '😘', '😂', '😅', '😎', '🙃', '😘',
      '😂', '😅', '😎', '🤠', '😘', '😂', '😅', '😎', '😡', '😘',
      '😂', '😅', '😎', '😡', '😘', '🤠', '😅', '😎', '🙃', '😘',
      '😂', '😅', '😎', '😡', '😘', '🤠', '😅', '😎', '🙃', '😘',
      '😂', '😅', '😎', '😡', '😘', '🤠', '😅', '😎', '🙃', '😘',]
    this.emojis = this.emojis.map(item => ({ text: item }))

    this.scrollToBottn()



  }
  componentDidUpdate() {
    this.scrollToBottn()
  }
  componentWillUnmount() {
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readCount(from, to)
  }

  toggleShow = () => {
    const toggleShow = !this.state.toggleShow
    this.setState({ toggleShow })
    if (toggleShow) {
      setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 0)
    }

  }
  // 发送消息
  send = async () => {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const context = this.state.context.trim()
    this.props.sendMsg({ from, to, context })
    this.setState({ context: '' })
  }
  render() {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat
    const meId = user._id

    if (!users[meId]) {
      return null
    }
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join("_")

    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

    const targetHeader = users[targetId].header
    const header = require(`../../assets/images/headers/${targetHeader}.png`).default

    return (
      <div id='chat-page'>
        <NavBar icon={<Icon type='left' />} onLeftClick={() => this.props.history.goBack()} className="title-navbar">{users[targetId].username}</NavBar>


        <List className="msgMain">
          {
            msgs.map(item => {
              if (targetId === item.from) {
                return (
                  <Item key={item._id} thumb={header} > {item.context} </Item>
                )
              } else {
                return (
                  <Item key={item._id} className='chat-me' extra='我' > {item.context} </Item>
                )
              }

            })
          }
        </List>

        <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
          <InputItem
            value={this.state.context}
            onChange={val => this.setState({ context: val })}
            placeholder="请输入"
            onFocus={() => { this.setState({ toggleShow: false }) }}
            extra={
              <span>
                <span onClick={this.toggleShow} style={{ marginRight: 10 }}>🙂</span>
                <span onClick={this.send}>发送</span>
              </span>
            } />
          {this.state.toggleShow ? (<Grid
            data={this.emojis}
            isCarousel
            columnNum={8}
            carouselMaxRow={4}
            onClick={(item) => { this.setState({ context: this.state.context + item.text }) }}
          ></Grid>) : null}
        </div>
      </div>)
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  }),
  {
    sendMsg, readCount
  }
)(Chat)