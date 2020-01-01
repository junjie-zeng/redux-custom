import {INCREMENT,DECREMENT,ADD_MSG} from './action-types';
// 添加
export const increment = (number)=>({type:INCREMENT,data:number})
// 删除
export const decrement = (number)=>({type:DECREMENT,data:number})
// 添加
export const addMsg = (msg)=>({type:ADD_MSG,data:msg})