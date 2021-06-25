import React, { Component } from 'react';

import { List, Grid } from "antd-mobile"

import PropTypes from "prop-types"

class HeadSelect extends Component {

 static propTypes = {
  setHeader: PropTypes.func.isRequired
 }
 state = {
  icon: '',
  text:''
 }
 constructor(props) {
  super(props)
  this.headerList = []
  for (let i = 1; i <= 20; i++) {
   this.headerList.push({
    icon: require(`../../assets/images/headers/头像${i}.png`).default,
    text: '头像' + i
   })
  }
 }
  
 setHeader = (el)=>{
  this.setState({icon:el.icon,text:el.text});
  this.props.setHeader(el.text)
 }

 render() {
  const {icon,text} = this.state
  return (
   <div>
    <List renderHeader={() => !icon?'请选择头像':<div>已选择头像：<img src={icon} alt={text}/></div>}>
     <Grid onClick={el=>{this.setHeader(el)}} data={this.headerList} columnNum={5}></Grid>
    </List>
   </div>
  );
 }
}

export default HeadSelect;