import ajax from "./ajax"

export const reqRegister = (user) => ajax('/register',user,'POST')

export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST')

export const reqUpdata = (user) => ajax('/updata',user,'POST')

export const reqUser = () => ajax('/user','GET')

export const reqUserList = (type)=>ajax('/list',{type})

export const reqChatMsgLisy = ()=>ajax('/msglist')

export const reqReadMsg = (from) => ajax('/readmsg',{from},'POST')