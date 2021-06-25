import { combineReducers } from "redux"
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

const initUser = {
  username: '',
  type: '',
  msg: '', //失败的错误提示信息
  //  redirectTo: '' //重定向到页面
}
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      // return action.data  //第一种写法
      return { ...action.data }
    case ERROR_MSG:
      return { ...state, msg: action.data }
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return { ...initUser, msg: action.data }
    default:
      return state
  }
}

const initUserList = []
function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  users: {},//所有用户信息
  chatMsgs: [],//当前用户所有相关的msg的数组
  unReadCount: 0 //总的未读数量
}
// 聊天状态
function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const { users, chatMsgs, userid } = action.data
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((pre, msg) => {
          return pre + (msg.to === userid && !msg.read ? 1 : 0)
        }, 0)
      }
    case RECEIVE_MSG:
      const { _doc } = action.data.chatMsg
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, _doc],
        unReadCount: state.unReadCount + (_doc.to === action.data.userid && !_doc.read ? 1 : 0)
      }
    case MSG_READ:
      const {count,from,to} = action.data
      console.log(count);
      
      return {
        users:state.users,
        chatMsgs:state.chatMsgs.map(item=>{
          if(!item.read&&item.from===from&&item.to===to){
            return {...item,read:true}
          }else{
            return item
          }
        }),
        unReadCount: state.unReadCount - count
      }
    default:
      return state;
  }
}

export default combineReducers({
  user,
  userList,
  chat
})