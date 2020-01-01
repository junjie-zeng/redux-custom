// 公共 redux
 // import { combineReducers } from 'redux' 
// 自定义的redux
import { combineReducers } from '../libs/redux'

import {INCREMENT,DECREMENT,ADD_MSG} from './action-types';

// 初始state
const initCount = 0;

// 管理count
function count (state = initCount,action){
    console.log("count ",action,state)
    switch(action.type){
      case INCREMENT:
      return state + action.data
      case DECREMENT:
      return state - action.data
      default:
      return state
    
    }
}

const initMsgs = [];
// 管理count
function msgs (state = initMsgs,action){
    console.log("msgs", action,state)
    switch(action.type){
      case ADD_MSG:
      // state.unshift(action.data) 这种写法是错误的，因为改变了原来的状态
      return [action.data,...state]
      default:
      return state
    
    }
}

export default combineReducers({
    count,
    msgs

})

