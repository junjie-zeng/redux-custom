// 公共
 import { createStore } from 'redux';
// 自定义的redux
//import { createStore } from '../libs/redux'
 
import reducers from './reducers'; // reducrs包含多个reducer的reducer



export default createStore(reducers)