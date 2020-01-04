import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// 普通版本
import NotRedux from './components/Not-redux';
// 自定义redux 版本
import ISRedux from './components/Is-redux';
// react-redux版本
import ReactRedux from './components/React-redux';
//import {Provider} from 'react-redux'
import {Provider} from './libs/react-redux'


// store
import store from './redux/store'

/**************************普通redux与自定义redux*********************************/
/*function render(){
	ReactDOM.render(
       <div>
           <NotRedux />
           <ISRedux store = {store}/>
       </div>
, document.getElementById('root'));

}

// 初始化渲染
render();
// 订阅
store.subscribe(render)
*/

/********************************react-redux************************************/
ReactDOM.render((
    <Provider store = {store}>
        <ReactRedux/>
    </Provider>
	),document.getElementById('root'));
  




/*******************************************************************************/



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
