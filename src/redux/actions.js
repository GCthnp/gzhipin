// 包含n个action ，同步action，异步action
import {
 reqRegister,
 reqLogin,
 reqUpdata,
 reqUser,
 reqUserList,
 reqChatMsgLisy,
 reqReadMsg
} from "../api"
import io from 'socket.io-client';

import {
 AUTH_SUCCESS,
 ERROR_MSG,
 RECEIVE_USER,
 RESET_USER,
 RECEIVE_USER_LIST,
 RECEIVE_MSG_LIST,
 RECEIVE_MSG,
 MSG_READ
} from "./action-types"

// 授权成功的同步action
const authSuccess = (user) => {
 return { type: AUTH_SUCCESS, data: user }
}
// 错误提示信息的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
const receiveUser = (user) => {
 return { type: RECEIVE_USER, data: user }
}
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
const receiveUserList = (users) => ({ type: RECEIVE_USER_LIST, data: users })

const receiveMsgList = ({ users, chatMsgs, userid }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userid } })

const receiveMsg = (chatMsg, userid) => ({ type: RECEIVE_MSG, data: { chatMsg, userid } })

const readMsg = (from,to,count) => ({ type: MSG_READ, data: { from,to,count } })

// 异步获取消息列表
async function getMsgList(disptach, userid) {
 initIO(disptach, userid)
 const response = await reqChatMsgLisy()
 const result = response.data
 if (result.code === 0) {
  const { users, chatMsgs } = result.data
  disptach(receiveMsgList({ users, chatMsgs, userid }))
 }
}

// 注册action  异步函数需要有返回函数
export const register = (user) => {
 const { username, password, password1, type } = user;
 if (!username) return errorMsg('用户名或密码为空');
 if (password !== password1) return errorMsg('密码不一致');

 return async disptach => {
  // 发送注册的异步ajax请求
  const response = await reqRegister({ username, password, type })
  const result = response.data
  if (result.code === 0) {
   // 分发成功的action
   disptach(authSuccess(result.data))
   return { code: result.code, type: result.data.type }
  } else {
   // 失败
   disptach(errorMsg(result.msg))
   return { code: result.code }
  }
 }
}

// 登录action
export const login = (user) => {
 return async disptach => {
  // 发送注册的异步ajax请求
  const response = await reqLogin(user)
  const result = response.data
  if (result.code === 0) {
   // 分发成功的action
   getMsgList(disptach, result.data._id)
   disptach(authSuccess(result.data))
   return { code: result.code, type: result.data.type }
  } else {
   // 失败
   disptach(errorMsg(result.msg))
   return result
  }
 }
}

// 更新信息action
export const updata = (user) => {
 return async disptach => {
  const response = await reqUpdata(user)
  const result = response.data
  if (result.code === 0) {
   // 成功
   disptach(receiveUser(result.data))
   return { code: result.code, type: result.data.type }
  } else {
   //请求失败
   disptach(resetUser(result.msg))
   return result
  }
 }
}

// 查询用户
export const selectUser = () => {
 return async disptach => {
  const response = await reqUser()
  const result = response.data
  if (result.code === 0) {
   getMsgList(disptach, result.data._id)
   disptach(receiveUser(result.data))
   return result.data
  } else {
   disptach(resetUser(result.msg))
  }
 }
}

// 查询用户列表
export const getUserList = (type) => {
 return async disptach => {
  const response = await reqUserList(type);
  const result = response.data;
  if (result.code === 0) {
   disptach(receiveUserList(result.data)
   )
  }
 }
}

function initIO(disptach, userid) {
 if (!io.socket) {
  const socket = io('ws://localhost:4000')
  socket.on('receiveMsg', function (chatMsg) {
   // console.log("客户端接收服务器发送的消息", chatMsg);
   if (userid === chatMsg._doc.from || userid === chatMsg._doc.to) {
    disptach(receiveMsg(chatMsg, userid))
   }

  })
 }
}
function inIO() {
 const socket = io('ws://localhost:4000')
 return socket
}

export const sendMsg = ({ from, to, context }) => {
 return disptach => {
  // console.log("发送消息", { from, to, context });
  inIO().emit('sendMsg', { from, to, context });
  return { code: 1 }
 }
}

export const readCount = (from,to) => {
 // |from 发送消息用户的id
 return async disptach => {
  const res = await reqReadMsg(from)
  // console.log(res.data);
  if (res.data.code === 0) {
   const count = res.data.data
   disptach(readMsg(from,to,count))
  }
 }
}