/**
 * 发送ajax请求
 */
import axios from "axios"

export default function ajax(url, data = {}, methods = "GET") {
 if (methods === "GET") {
  // 准备 url query 参数数据 
  let dataStr = ''
  //数据拼接字符串 
  Object.keys(data).forEach(key => { dataStr += key + '=' + data[key] + '&' })
  if (dataStr !== '') {
   dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
   url = url + '?' + dataStr
  }
  return axios.get(url)
 } else {
  return axios.post(url, data)
 }
}