// redux
// import { createStore } from 'redux'; // 公共redux
import { createStore } from '../libs/redux' // 自定义的redux

// reducers
import reducers from './reducers'; // reducrs包含多个reducer的reducer



export default createStore(reducers)