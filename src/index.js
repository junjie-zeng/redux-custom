import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NotRedux from './components/Not-redux';
import ISRedux from './components/Is-redux';
import * as serviceWorker from './serviceWorker';
import store from './redux/store'

ReactDOM.render(
       <div>
           <NotRedux />
           <ISRedux store = {store}/>
       </div>
, document.getElementById('root'));

// 订阅
store.subscribe(function(){
    ReactDOM.render(
        <div>
            <NotRedux />
            <ISRedux store = {store}/>
        </div>
 , document.getElementById('root'));
})











// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
